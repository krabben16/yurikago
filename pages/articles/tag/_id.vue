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
    const title = tag.data.name
    return {
      tag: tag.data,
      articles: articles.data.reverse(),
      title: title,
      breadcrumbItemList: [
        {
          name: "トップページ",
          path: "/"
        },
        {
          name: title,
          path: `/articles/tag/${context.params.id}`
        }
      ]
    }
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
      // 構造化マークアップ
      script: [
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
