<template>
  <div>
    <h1>記事一覧</h1>
    <h2 class="mt-4">
      {{ title }}
    </h2>
    <div class="mt-4" v-for="(article, i) in articles" :key="article.id">
      <ArticleListItem :article="article" />
      <hr v-if="i < articles.length - 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticle } from '~/interfaces/Content'

export default defineComponent({
  props: {
    articles: {
      type: Array as () => ContentArticle[],
      required: true,
    },
    title: {
      type: String as () => string,
      required: true,
    },
  },
})
</script>
