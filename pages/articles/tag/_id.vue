<template>
  <ArticleList :articles="articles" />
</template>

<script>
import { mapActions } from "vuex"
import ArticleList from "~/components/ArticleList.vue"

export default {
  components: {
    ArticleList
  },
  async asyncData(context) {
    const articles = await context.app.$axios.get(`/articles/tag/${context.params.id}`)
    const tag = await context.app.$axios.get(`/tags/${context.params.id}`)
    return {
      id: context.params.id,
      tag: tag.data,
      articles: articles.data.reverse()
    }
  },
  created() {
    this.title = this.tag.name
    this.description = `タグ「${this.tag.name}」を含む記事の一覧です。`
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/tag/${this.id}`
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
