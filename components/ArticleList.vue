<template>
  <div>
    <h1>記事一覧</h1>
    <h2 class="mt-4">
      {{ title }}
    </h2>
    <div v-for="article in articles" :key="article.id" class="mt-4">
      <ArticleListItem :article="article" />
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
