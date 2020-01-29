<template>
  <div class="container">
    <div class="row" v-for="article in articles" :key="article.id">
      <div class="column col-12 col-sm-8 mx-sm-auto">
        <Article :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
  props: [
    'articles'
  ]
}
</script>

<style lang="scss" scoped>
.row:nth-child(n+2) {
  margin-top: 40px;
}
</style>
