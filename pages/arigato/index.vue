<template>
  <Markdown :markdown-content="arigato.markdown" />
</template>

<script>
import { mapActions } from "vuex"
import Markdown from "~/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  async asyncData(context) {
    const arigato = await context.app.$axios.get("/arigato")
    return {
      arigato: arigato.data
    }
  },
  created() {
    this.title = "ありがとうございます"
    this.description = "利用させていただいているライブラリやフレームワークなどをまとめたページです。"
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: "/arigato"
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
