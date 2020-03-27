<template>
  <div class="container">
    <div v-for="article in articles" :key="article.id" class="row c-article-list">
      <div class="col-12 col-sm-10 mx-sm-auto">
        <Article :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import Article from "~/components/Article.vue"

export default {
  components: {
    Article
  },
  props: {
    articles: Array
  }
}
</script>
