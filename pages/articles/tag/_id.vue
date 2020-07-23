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
import { getTagById } from "~/plugins/tags.js"
import { getArticlesByTagId } from "~/plugins/articles.js"

export default {
  components: {
    ArticleList
  },
  async asyncData(context) {
    const id = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    const tag = getTagById(id)
    const articles = getArticlesByTagId(id)

    // タグまたは記事リストが存在しない場合はエラーページに遷移する
    if (!tag || !articles) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      tagId: id,
      tag: tag,
      articles: articles
    }
  },
  created() {
    // TDK
    this.title = this.tag.name
    this.description = `タグ「${this.tag.name}」を含む記事の一覧です。`

    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/tag/${this.tagId}`
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
