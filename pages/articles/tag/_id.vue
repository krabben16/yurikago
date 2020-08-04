<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ArticleList from "~/components/ArticleList.vue"
import { articleUseCase, tagUseCase } from "~/resources/js/index.ts"

export default {
  components: {
    ArticleList
  },
  asyncData (context) {
    const tagId = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    const tag = tagUseCase.getTagById(tagId)
    const articles = articleUseCase.getArticlesByTagId(tagId)

    // タグまたは記事リストが存在しない場合はエラーページに遷移する
    if (!tag || !articles) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      tagId,
      tag,
      articles
    }
  },
  created () {
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
