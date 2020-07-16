<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-5 mx-sm-auto">
        <ArticleList :articles="articles" class-name="py-5" />
        <Pagenation class-name="clearfix pb-5" :active-page="activePage" :total-article-count="totalArticleCount" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ArticleList from "~/components/ArticleList.vue"
import Pagenation from "~/components/Pagenation.vue"
import { getTotalArticleCount, getArticlesByPage } from "~/plugins/articles.js"

export default {
  components: {
    ArticleList,
    Pagenation
  },
  async asyncData(context) {
    // NaN = Not a Number
    // typeof context.params.page => string
    const page = isNaN(context.params.page) ? 1 : parseInt(context.params.page)
    const articles = getArticlesByPage(page)
    const totalArticleCount = getTotalArticleCount()

    if (!articles) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      activePage: page,
      articles: articles,
      totalArticleCount: totalArticleCount
    }
  },
  created() {
    // TDK
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
