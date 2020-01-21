<template>
  <div class="content">
    <Markdown :markdownContent="profile.markdown"></Markdown>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.vue'

export default {
  components: {
    Markdown
  },
  async asyncData ({ $axios }) {
    const res = await $axios.$get('/api/profile')
    return {
      profile: res
    }
  },
  data () {
    return {
      title: 'プロフィール'
    }
  },
  head () {
    return {
      title: this.title,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.title, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.title)
  },
}
</script>
