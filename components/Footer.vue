<template>
  <footer class="l-footer bg-dark mt-5 py-3">
    <a :href="githubUrl" target="_blank" @click="$ga.event('header', 'click', 'github')">
      <div class="text-light my-3">
        <i class="fab fa-github fa-3x" />
      </div>
    </a>
    <div class="text-light">&copy; 2020 Hiroki Kawaguchi, Built with Nuxt.js</div>
    <div class="text-light">This site uses Google Analytics.</div>
  </footer>
</template>

<script>
export default {
  created() {
    this.githubUrl = process.env.GITHUB_URL
  }
}
</script>
