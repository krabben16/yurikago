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
      tag: tag.data,
      articles: articles.data.reverse()
    }
  },
  mounted() {
    // パンくず
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.tag.name,
        path: this.$route.path
      }
    ]
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
    return {
      title: this.tag.name,
      // 構造化マークアップ
      script: [
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.tag.name, this.$route.path),
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
