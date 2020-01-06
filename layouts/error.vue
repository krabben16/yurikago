<template>
  <div>
    <h2 v-if="error.statusCode === 404">ページが見つかりません</h2>
    <h2 v-else>エラーが発生しました</h2>
    <pre>
      　　　　∧ ∧
      　　　　ﾊ丿ﾊ丿
      　　　／￣￣＼
      　　 / ⌒　⌒ ヽ
      　　｜ へ　へ　|
      　　/　　　　　|
      　 /　　　　　 |
      　｜　　　　 　ヽ
      　(＼＿＿＿/⌒) |
      　｜　　　｜　ヽ|
      　 ＼ ノ　 ＼ ノ|
      ￣￣￣￣￣￣￣￣￣￣
    </pre>
  </div>
</template>

<script>
export default {
  props: [
    'error'
  ],
  head () {
    return {
      title: 'Error'
    }
  }
}
</script>
