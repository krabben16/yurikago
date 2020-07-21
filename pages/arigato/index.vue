<script>
export default {
  /**
   * NOTE: ページをクローズしてトップページへリダイレクトする
   */
  asyncData({ redirect }) {
    return redirect(301, "/")
  }
}
</script>
