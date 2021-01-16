<template>
  <nuxt-link :to="`/articles/${article.id}`">
    <!-- 記事タイトル -->
    <div class="text-xl">
      {{ article.title }}
    </div>
    <!-- 作成日 -->
    <div class="flex flex-row">
      <span class="mr-2">Created:</span>
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}

span,
time {
  color: #4a5568;
  font-weight: initial;
}
</style>
