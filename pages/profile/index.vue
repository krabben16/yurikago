<template>
  <div class="content-wrapper">
    <Markdown :markdown-content="profile.markdown" />
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
    const profile = await context.app.$axios.get("/profile")
    return {
      profile: profile.data
    }
  },
  data() {
    return {
      title: "プロフィール"
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
        name: this.title,
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
