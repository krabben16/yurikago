<template>
  <div>
    <div class="l-error">
      <h2 v-if="error.statusCode === 404">404 Not Found</h2>
      <h2 v-else>エラーが発生しました</h2>
      <div>
        <pre class="c-error-message">
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
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  props: {
    error: Object
  },
  created() {
    this.title = "エラー"
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
      title: this.title
    }
  }
}
</script>
