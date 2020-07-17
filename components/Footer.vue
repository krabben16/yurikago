<template>
  <footer :class="className">
    <div class="text-muted">&copy; 2020 Hiroki Kawaguchi, Built with Nuxt.js</div>
    <div class="text-muted">This site uses Google Analytics.</div>
  </footer>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    }
  }
}
</script>
