<template>
  <nuxt-link :to="`/articles/${article.id}`">
    <!-- 記事タイトル -->
    <div class="text-lg">
      {{ article.title }}
    </div>
    <!-- 作成日 -->
    <div class="flex flex-row">
      <time :datetime="$dayjs(article.date).format('YYYY-MM-DD')">{{
        $dayjs(article.date).format('YYYY/MM/DD')
      }}</time>
    </div>
    <!-- 概要 -->
    <div>
      {{ article.description }}
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}

a > div:nth-child(n + 2) {
  @apply text-sm;
  @apply font-normal;
}
</style>
