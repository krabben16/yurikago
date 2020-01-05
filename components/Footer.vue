<template>
  <footer>
    <hr>
    <div>
      <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
      <nuxt-link :to="{ name: 'arigato' }" class="arigato">&#x1f64f;</nuxt-link>
    </div>
    <div>ゆりかごから墓場まで</div>
    <div>
      &copy; 2020 Hiroki Kawaguchi, Built with <a href="https://ja.nuxtjs.org/" target="_blank">Nuxt.js</a>
    </div>
  </footer>
</template>

<style>
.arigato {
  float: right;
}
</style>
