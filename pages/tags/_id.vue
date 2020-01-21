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
    let response = null
    response = await context.app.$axiosInstance.get(`/api/articles/tag-${context.params.id}`)
    const matchList = response.data
    response = await context.app.$axiosInstance.get(`/api/tags/${context.params.id}`)
    const tag = response.data
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
