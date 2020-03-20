<template>
  <div>
    <ArticleList :articles="articles" />
    <Pagenation :activePage="activePage" :totalArticleCount="totalArticleCount" />
  </div>
</template>

<script>
import ArticleList from "~/components/ArticleList.vue"
import Pagenation from "~/components/Pagenation.vue"

export default {
  components: {
    ArticleList,
    Pagenation
  },
  async asyncData(context) {
    const page = 1
    const articles = await context.app.$axios.get(`/articles?p=${page}`)
    const count = await context.app.$axios.get("/articles/count")
    return {
      activePage: page,
      articles: articles.data,
      totalArticleCount: count.data
    }
  },
  data() {
    return {
      title: "Yurikago Blog"
    }
  },
  mounted() {
    // パンくず
    this.$nuxt.$emit("clearPageName")
  },
  head() {
    return {
      titleTemplate: this.title,
      // 構造化マークアップ
      script: [
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.title, this.$route.path),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"]
      }
    }
  }
}
</script>
