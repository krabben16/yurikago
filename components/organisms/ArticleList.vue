<template>
  <div class="grid grid-cols-1 gap-10 py-4">
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
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
