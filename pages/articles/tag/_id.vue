<template>
  <div class="row">
    <div class="col-11 mx-auto col-sm-4 mx-sm-auto">
      <ArticleList :articles="articles" />
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
      return context.error({ statusCode: 404, message: "ページが見つかりません" })
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
