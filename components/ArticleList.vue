<template>
  <div>
    <div v-for="(article, i) in articles" :key="article.id">
      <ArticleListItem :article="article" />
      <hr v-if="i < articles.length - 1" />
    </div>
  </div>
</template>

<script>
import ArticleListItem from "~/components/ArticleListItem.vue"

export default {
  props: {
    articles: {
      type: Array,
      required: true
    }
  },
  components: {
    ArticleListItem
  }
}
</script>
