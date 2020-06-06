<template>
  <Article :article="article" />
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
    return {
      id: context.params.id
    }
  },
  computed: {
    ...mapGetters("articles", ["landingArticleID"])
  },
  created() {
    this.article = getArticleById(this.id)

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
