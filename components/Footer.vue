<template>
  <footer :class="className">
    <a :href="githubUrl" target="_blank" @click="$ga.event('header', 'click', 'github')">
      <div class="text-dark py-3">
        <i class="fab fa-github fa-3x" />
      </div>
    </a>
    <div class="text-dark">&copy; 2020 Hiroki Kawaguchi, Built with Nuxt.js</div>
    <div class="text-dark">This site uses Google Analytics.</div>
  </footer>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    }
  },
  created() {
    this.githubUrl = process.env.GITHUB_URL
  }
}
</script>
