<template>
  <div class="grid grid-cols-1 gap-10">
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :article="article"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticleListItem } from '~/interfaces/content'
import ArticleListItem from '~/components/molecules/ArticleListItem.vue'

export default defineComponent({
  components: {
    ArticleListItem
  },
  props: {
    articles: {
      type: Array as () => IContentArticleListItem[],
      required: true,
    },
  },
})
</script>
