<template>
  <nuxt-link :to="`/articles/${article.id}`">
    <!-- 記事タイトル -->
    <div class="text-xl">
      {{ article.title }}
    </div>
    <!-- 作成日 -->
    <div class="flex flex-row text-gray-600">
      <div class="mr-2">Created:</div>
      <time :datetime="$dayjs(article.date).format('YYYY-MM-DD')">{{
        $dayjs(article.date).format('YYYY/MM/DD')
      }}</time>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticleListItem } from '~/interfaces/Content'

export default defineComponent({
  props: {
    article: {
      type: Object as () => ContentArticleListItem,
      required: true,
    },
  },
})
</script>
