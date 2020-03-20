<template>
  <div class="content-wrapper">
    <Markdown :markdownContent="arigato.markdown" />
  </div>
</template>

<script>
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
  data() {
    return {
      title: "ありがとうございます"
    }
  },
  mounted() {
    // パンくず
    this.$nuxt.$emit("setPageName", this.title)
  },
  head() {
    return {
      title: this.title,
      // 構造化マークアップ
      script: [
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.title, this.$route.path),
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
