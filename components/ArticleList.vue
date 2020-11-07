<template>
  <div>
    <h1>記事一覧</h1>
    <h2 class="my-4">
      {{ title }}
    </h2>
    <div v-for="(article, i) in articles" :key="article.id">
      <ArticleListItem :article="article" />
      <hr v-if="i < articles.length - 1" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ArticleListItem from '~/components/ArticleListItem.vue'

export default Vue.extend({
  components: {
    ArticleListItem,
  },
  props: {
    articles: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
})
</script>
