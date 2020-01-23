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
    const matchList = await context.app.$axios.$get(`/api/articles/category/${context.params.id}`)
    const category = await context.app.$axios.$get(`/api/categories/${context.params.id}`)
    return {
      category: category,
      matchList: matchList.reverse()
    }
  },
  head () {
    return {
      title: this.category.name,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.category.name, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.category.name)
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
