<template>
  <div class="row">
    <div class="col-11 mx-auto col-sm-6 mx-sm-auto">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Article from "~/components/Article.vue"
import { getJoinedTagsName } from "~/plugins/tags.js"
import { getArticleById } from "~/plugins/articles.js"

export default {
  components: {
    Article
  },
  async asyncData(context) {
    const id = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    const article = getArticleById(id)

    // 記事データが存在しない場合はエラーページに遷移する
    // @see https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
    if (!article) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      article: article
    }
  },
  computed: {
    ...mapGetters("articles", ["landingArticleID"])
  },
  created() {
    // TDK
    this.title = this.article.title
    const joinedTagsName = getJoinedTagsName(this.article.tags)
    this.description = `「${this.article.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagsName}」を含みます。`

    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/${this.article.id}`
      }
    ]
  },
  mounted() {
    if (!this.landingArticleID) {
      this.changeLandingArticleID(this.article.id)
    }

    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("articles", ["changeLandingArticleID"]),
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
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/zenburn.min.css",
          type: "text/css"
        }
      ],
      script: [
        // 構造化マークアップ
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.breadcrumbItemList),
          type: "application/ld+json"
        },
        {
          hid: "articleSchema",
          innerHTML: this.$getArticleSchema(this.article),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"],
        articleSchema: ["innerHTML"]
      }
    }
  }
}
</script>
