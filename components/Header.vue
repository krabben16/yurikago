<template>
  <header>
    <div class="navigation__wrapper">
      <h1><nuxt-link :to="{ name: 'index' }">Yurikago Blog</nuxt-link></h1>
      <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
      <nuxt-link :to="{ name: 'arigato' }" class="arigato">&#x1f64f;</nuxt-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.navigation {
  &__wrapper {
    width: 400px;
    height: 100px;

    margin-left: 200px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
      font-weight: lighter;
    }

    a {
      text-decoration: none;
    }
  }
}
</style>
