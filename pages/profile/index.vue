<template>
  <Markdown :markdown-content="profile.markdown" />
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
  created() {
    this.title = "プロフィール"
    this.description = "プロフィールやスキルセットなどをまとめたページです。"
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: "/profile"
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
