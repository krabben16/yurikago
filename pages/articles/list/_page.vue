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
    // NaN = Not a Number
    // typeof context.params.page => string
    const page = isNaN(context.params.page) ? 1 : parseInt(context.params.page)
    const articles = await context.app.$axios.get(`/articles?p=${page}`)
    const count = await context.app.$axios.get("/articles/count")
    const title = `記事一覧${page}`
    return {
      activePage: page,
      articles: articles.data,
      totalArticleCount: count.data,
      title: title,
      breadcrumbItemList: [
        {
          name: "トップページ",
          path: "/"
        },
        {
          name: title,
          path: `/articles/list/${page}`
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
