<template>
  <header>
    <h1><nuxt-link :to="{ name: 'index' }">Yurikago Blog</nuxt-link></h1>
    <div>
      <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
    </div>
  </header>
</template>

<style scoped>
a {
  text-decoration: none;
}

header {
  margin-bottom: 1.5em;
}
</style>
