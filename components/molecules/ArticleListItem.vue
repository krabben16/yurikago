<template>
  <nuxt-link :to="`/articles/${article.id}`">
    <!-- 記事タイトル -->
    <div class="text-lg">
      {{ article.title }}
    </div>
    <div class="flex flex-row">
      <!-- 作成日 -->
      <time :datetime="$dayjs(article.date).format('YYYY-MM-DD')">{{
        $dayjs(article.date).format('YYYY/MM/DD')
      }}</time>
      <!-- カテゴリ -->
      <spna class="ml-2">
        {{ category.name }}
      </spna>
    </div>
    <!-- 概要 -->
    <div>
      {{ article.description }}
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticleListItem } from '~/interfaces/content'
import { createCategory } from '~/lib/category'

export default defineComponent({
  props: {
    article: {
      type: Object as () => IContentArticleListItem,
      required: true,
    },
  },
  setup({ article }) {
    return {
      category: createCategory(article.id),
    }
  },
})
</script>

<style scoped>
a {
  text-decoration: none;
}

/* text-gray-700 => rgba(74, 85, 104, var(--text-opacity)) => #4a5568 */
a > div:nth-child(n + 2) {
  @apply text-sm text-gray-700 font-normal;
}
</style>
