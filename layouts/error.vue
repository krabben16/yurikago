<template>
  <div class="l-error">
    <h2 v-if="error.statusCode === 404">404 {{ error.message }}</h2>
    <h2 v-else>エラーが発生しました</h2>
    <div class="ml-3">
      <pre class="c-ascii-art">
        ∧ ∧
        ﾊ丿ﾊ丿
      ／￣￣＼
     / ⌒  ⌒ ヽ
    ｜ へ  へ  |
    /          |
   /           |
  ｜           ヽ
  (＼＿＿＿/⌒) |
  ｜      ｜  ヽ|
   ＼ ノ   ＼ ノ|
￣￣￣￣￣￣￣￣￣￣
      </pre>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  created() {
    // TDK
    this.title = "エラー"
    this.description = "エラーページです！"

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
      ]
    }
  }
}
</script>
