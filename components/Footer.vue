<template>
  <footer :class="className">
    <div class="py-4">
      <a :href="githubUrl" target="_blank" @click="$ga.event('header', 'click', 'github')">
        <!-- NOTE: アイコンは親要素のサイズとカラーを継承する -->
        <span class="text-dark">
          <i class="fab fa-github fa-3x" />
        </span>
      </a>
    </div>
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
