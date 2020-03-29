<template>
  <Markdown :markdown-content="about.markdown" />
</template>

<script>
import { mapActions } from "vuex"
import Markdown from "~/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  async asyncData(context) {
    const about = await context.app.$axios.get("/about")
    return {
      about: about.data
    }
  },
  created() {
    this.title = "このサイトについて"
    this.description = "このサイトを作成した背景や方法などをまとめたページです。"
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: "/about"
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
