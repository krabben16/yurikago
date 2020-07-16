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
  asyncData() {
    const page = 1
    return {
      activePage: page
    }
  },
  created() {
    const articles = getArticlesByPage(this.activePage)
    this.articles = articles
    this.totalArticleCount = getTotalArticleCount()

    // TDK
    this.title = "トップページ"
    this.description = `${process.env.SITE_OWNER}の技術ブログです。`

    this.breadcrumbItemList = [
      {
        name: this.title,
        path: "/"
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
