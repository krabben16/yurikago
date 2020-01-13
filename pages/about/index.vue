<template>
  <div class="content">
    <Markdown :markdownContent="profileContent"></Markdown>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.vue'
import content from '~/assets/markdown/about.md'

export default {
  components: {
    Markdown
  },
  computed: {
    profileContent () {
      return content
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
