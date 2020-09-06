<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" title="直近の記事" />
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

export default {
  components: {
    ArticleList,
    Pagenation
  },
  async asyncData (context) {
    const activePage = 1
    const limitCount = process.env.MAX_ARTICLE_COUNT_IN_LIST
    const articles = await context.$content("articles").sortBy("id", "desc").limit(limitCount).fetch()

    const totalArticle = await context.$content("articles").only(["id"]).fetch()
    const totalArticleCount = totalArticle.length

    return {
      activePage,
      articles,
      totalArticleCount
    }
  },
  created () {
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
