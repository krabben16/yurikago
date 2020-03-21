<template>
  <div class="content-wrapper">
    <div class="error-wrapper">
      <h2 v-if="error.statusCode === 404">404 Not Found</h2>
      <h2 v-else>エラーが発生しました</h2>
      <div>
        <pre>
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

<style lang="scss" scoped>
.error-wrapper {
  // 中央寄せ
  display: flex;
  align-items: center;
  justify-content: center;

  pre {
    line-height: 1.2em;
  }
}
</style>
