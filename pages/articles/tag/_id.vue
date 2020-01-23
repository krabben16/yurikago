<template>
  <ArticleList :articles="matchList" />
</template>

<script>
import Article from '~/components/Article.vue'
import ArticleList from '~/components/ArticleList.vue'

export default {
  components: {
    Article,
    ArticleList
  },
  async asyncData (context) {
    const matchList = await context.app.$axios.$get(`/api/articles/tag/${context.params.id}`)
    const tag = await context.app.$axios.$get(`/api/tags/${context.params.id}`)
    return {
      tag: tag,
      matchList: matchList.reverse()
    }
  },
  head () {
    return {
      title: this.tag.name,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.tag.name, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.tag.name)
  }
}
</script>
