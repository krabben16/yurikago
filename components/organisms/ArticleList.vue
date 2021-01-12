<template>
  <div>
    <div v-for="(article, i) in articles" :key="article.id">
      <ArticleListItem :article="article" />
      <hr v-if="i < articles.length - 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticleListItem } from '~/interfaces/Content'

export default defineComponent({
  props: {
    articles: {
      type: Array as () => ContentArticleListItem[],
      required: true,
    },
  },
})
</script>
