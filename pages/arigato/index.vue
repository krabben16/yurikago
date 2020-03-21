<template>
  <div class="content-wrapper">
    <Markdown :markdown-content="arigato.markdown" />
  </div>
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
    const title = "ありがとうございます"
    return {
      arigato: arigato.data,
      title: title,
      breadcrumbItemList: [
        {
          name: "トップページ",
          path: "/"
        },
        {
          name: title,
          path: "/arigato"
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
