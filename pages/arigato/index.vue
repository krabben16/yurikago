<template>
  <div class="container-fluid bg-white">
    <div class="row py-5">
      <div class="col-12 col-sm-5 mx-sm-auto">
        <Markdown :markdown-content="content" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import Markdown from "~/components/Markdown.vue"
import markdownSource from "~/assets/markdown/arigato.md"

export default {
  components: {
    Markdown
  },
  created() {
    this.content = markdownSource

    // TDK
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
