<template>
  <div class="content-wrapper">
    <Markdown :markdownContent="about.markdown" />
  </div>
</template>

<script>
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
  data() {
    return {
      title: "このサイトについて"
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
