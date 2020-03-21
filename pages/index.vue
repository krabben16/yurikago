<template>
  <div>
    <ArticleList :articles="articles" />
    <Pagenation :active-page="activePage" :total-article-count="totalArticleCount" />
  </div>
</template>

<script>
import { mapActions } from "vuex"
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
    const title = "トップページ"
    return {
      activePage: page,
      articles: articles.data,
      totalArticleCount: count.data,
      title: title,
      breadcrumbItemList: [
        {
          name: title,
          path: "/"
        }
      ]
    }
  },
  mounted() {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
    return {
      title: this.title,
      // 構造化マークアップ
      script: [
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.breadcrumbItemList),
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
