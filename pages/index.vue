<template>
  <div>
    <ArticleList :articles="articles" />
    <Pagenation :activePage="activePage" :articleTotalCount="articleTotalCount" />
  </div>
</template>

<script>
import ArticleList from '~/components/ArticleList.vue'
import Pagenation from '~/components/Pagenation.vue'

export default {
  components: {
    ArticleList,
    Pagenation
  },
  async asyncData (context) {
    // NaN => Not a Number
    const p = isNaN(context.query.p) ? 1 : Number(context.query.p)
    const articles = await context.app.$axios.$get('/api/articles?p=' + p)
    const count = await context.app.$axios.$get('/api/articles/count')
    return {
      articles: articles,
      activePage: p,
      articleTotalCount: count
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
