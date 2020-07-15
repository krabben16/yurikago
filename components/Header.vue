<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-dark navbar-dark mb-5">
    <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
      Yurikago Blog
    </nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div id="navbarSupportedContent" class="collapse navbar-collapse">
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link :to="{ name: 'about' }" class="nav-link">About</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link :to="{ name: 'arigato' }" class="nav-link">Arigato</nuxt-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  created() {
    this.githubUrl = process.env.GITHUB_URL
  }
}
</script>
