<template>
  <nav class="navbar navbar-expand-sm navbar-dark">
    <nuxt-link :to="{ name: 'index' }" class="navbar-brand">Yurikago Blog</nuxt-link>
    <button class="navbar-toggler" type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
      <div class="navbar-nav">
        <nuxt-link :to="{ name: 'about' }" class="nav-item nav-link">About</nuxt-link>
        <nuxt-link :to="{ name: 'profile' }" class="nav-item nav-link">Profile</nuxt-link>
        <nuxt-link :to="{ name: 'arigato' }" class="nav-item nav-link">&#x1f64f;</nuxt-link>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  background-color: lightslategray;
}
</style>
