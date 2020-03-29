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
    return {
      activePage: page,
      articles: articles.data,
      totalArticleCount: count.data
    }
  },
  created() {
    this.title = `記事一覧${this.activePage}`
    this.description = `記事一覧の${this.activePage}ページ目です。`
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/list/${this.activePage}`
      }
    ]
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
      meta: [
        {
          "description": this.description
        }
      ],
      script: [
        // 構造化マークアップ
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
