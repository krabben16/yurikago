<template>
  <div class="content">
    <Markdown :markdownContent="about.markdown"></Markdown>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.vue'

export default {
  components: {
    Markdown
  },
  async asyncData ({ $axios }) {
    const res = await $axios.$get('/api/about')
    return {
      about: res
    }
  },
  data () {
    return {
      title: 'このサイトについて'
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
