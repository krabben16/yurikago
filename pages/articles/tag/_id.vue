<template>
  <div class="list">
    <div v-for="article in matchList" :key="article.id" class="article-wrapper">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
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

<style lang="scss" scoped>
.article-wrapper {
  margin-top: 30px;
  
  a {
    text-decoration: none
  }
}
</style>
