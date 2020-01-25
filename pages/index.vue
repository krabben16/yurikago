<template>
  <ArticleList :articles="articles" />
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'

export default {
  components: {
    ArticleList
  },
  async asyncData ({ $axios }) {
    const res = await $axios.$get('/api/articles')
    return {
      articles: res.reverse()
    }
  },
  data () {
    return {
      title: 'Yurikago Blog'
    }
  },
  head () {
    return {
      titleTemplate: this.title,
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
    this.$nuxt.$emit('clearPageName')
  }
}
</script>
