<template>
  <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4"><nuxt-link :to="{ name: 'index' }">Yurikago Blog</nuxt-link></h1>
      <p class="lead">Webエンジニア3年目の技術ブログ</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.jumbotron {
  background-color: lightslategray;
  margin-bottom: 50px;

  h1 {    
    a {
      color: white;
      text-decoration: none;
    }
  }

  p {
    color: white;
  }
}
</style>
