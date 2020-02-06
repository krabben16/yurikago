<template>
  <div class="content-wrapper">
    <Markdown :markdownContent="arigato.markdown"></Markdown>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.vue'

export default {
  components: {
    Markdown
  },
  async asyncData ({ $axios }) {
    const arigato = await $axios.get('/arigato')
    return {
      arigato: arigato.data
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
