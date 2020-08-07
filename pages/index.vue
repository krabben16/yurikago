<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" />
        <div class="mt-4">
          <Pagenation :active-page="activePage" :total-article-count="totalArticleCount" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ArticleList from "~/components/ArticleList.vue"
import Pagenation from "~/components/Pagenation.vue"
import { articleUseCase } from "~/resources/ts/entry.ts"

export default {
  components: {
    ArticleList,
    Pagenation
  },
  asyncData () {
    const page = 1
    return {
      activePage: page
    }
  },
  created () {
    this.articles = articleUseCase.getArticlesByPage(this.activePage)
    this.totalArticleCount = articleUseCase.getTotalArticleCount()

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
  mounted () {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          content: this.description
        },
        {
          property: "og:title",
          content: `${this.title} | Yurikago Blog`
        },
        {
          property: "og:type",
          content: "blog"
        },
        {
          property: "og:description",
          content: this.description
        },
        {
          property: "og:url",
          content: process.env.FRONT_URL + this.$route.path
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
