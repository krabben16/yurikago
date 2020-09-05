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

export default {
  components: {
    ArticleList,
    Pagenation
  },
  async asyncData (context) {
    // NaN = Not a Number
    // typeof context.params.page => string
    const activePage = isNaN(context.params.page) ? 1 : parseInt(context.params.page)
    const skipCount = activePage === 1 ? 0 : (activePage - 1) * process.env.MAX_ARTICLE_COUNT_IN_LIST
    const limitCount = process.env.MAX_ARTICLE_COUNT_IN_LIST
    const articles = await context.$content("articles").sortBy("id", "desc").skip(skipCount).limit(limitCount).fetch()

    if (articles.length === 0) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

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
