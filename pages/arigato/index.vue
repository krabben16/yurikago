<template>
  <div>
    <div>
      <h2>Markdown parser</h2>
      <a href="https://marked.js.org/" target="_blank">Marked.js</a>
    </div>
    <div>
      <h2>Syntax highlighter</h2>
      <a href="https://highlightjs.org/" target="_blank">highlight.js</a>
    </div>
    <div>
      <h2>Favicon</h2>
      <a href="https://icooon-mono.com/" target="_blank">ICOOON MONO</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      title: 'Arigato'
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.title)
  },
}
</script>
