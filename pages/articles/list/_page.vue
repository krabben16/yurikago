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
  data() {
    // asyncDataで定義した値を参照できない？
    return {
      titlePrefix: "記事一覧"
    }
  },
  mounted() {
    // パンくず
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.titlePrefix + this.activePage,
        path: this.$route.path
      }
    ]
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
    return {
      title: this.titlePrefix + this.activePage,
      // 構造化マークアップ
      script: [
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.titlePrefix + this.activePage, this.$route.path),
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
