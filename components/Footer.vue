<template>
  <footer :class="className">
    <div class="text-light">&copy; 2020 Hiroki Kawaguchi, Built with Nuxt.js</div>
    <div class="text-light">This site uses Google Analytics.</div>
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
