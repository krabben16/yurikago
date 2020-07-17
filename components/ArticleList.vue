<template>
  <div :class="className">
    <div class="card-columns">
      <ArticleListItem v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script>
import ArticleListItem from "~/components/ArticleListItem.vue"

export default {
  props: {
    className: {
      type: String,
      default: ""
    },
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
