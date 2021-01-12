<template>
  <div>
    <!-- タイトル -->
    <h1>{{ article.title }}</h1>

    <!-- 作成日 -->
    <div class="mt-3">
      <span class="mr-1">Created: </span>
      {{ $dayjs(article.date).format('YYYY/MM/DD') }}
    </div>

    <!-- タグ -->
    <div>
      <span class="mr-1">Tags: </span>
      <TagListItem
        v-for="(tag, j) in article.tags"
        :key="tag.id"
        :tag="tag"
        :class="{ 'ml-2': j > 0 }"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticle } from '~/interfaces/Content'

export default defineComponent({
  props: {
    article: {
      type: Object as () => ContentArticle,
      required: true,
    },
  },
})
</script>
