<template>
  <Markdown :markdownContent="arigatoContent"></Markdown>
</template>

<script>
import Markdown from '~/components/Markdown.vue'
import content from '~/assets/markdown/arigato.md'

export default {
  components: {
    Markdown
  },
  computed: {
    arigatoContent () {
      return content
    }
  },
  data () {
    return {
      title: 'ありがとうございます'
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
