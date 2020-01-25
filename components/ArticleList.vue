<template>
  <div class="container">
    <div class="row">
      <div class="column col-12">
        <Article :article="firstArticle" />
      </div>
    </div>
    <div class="row">
      <div class="column col-12 col-sm-4" v-for="article in otherArticles" :key="article.id">
        <Article class="other" :article="article" />
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
  computed: {
    firstArticle () {
      return this.articles[0]
    },
    otherArticles () {
      return this.articles.slice(1)
    }
  },
  props: [
    'articles'
  ]
}
</script>

<style lang="scss" scoped>
.other {
  margin-top: 40px;
}
</style>
