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
export default {
  props: {
    error: Object
  },
  mounted() {
    // パンくず
    this.$nuxt.$emit("setPageName", "エラー")
  },
  head() {
    return {
      title: "Error"
    }
  }
}
</script>
