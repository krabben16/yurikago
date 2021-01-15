<template>
  <div>
    <!-- タイトル -->
    <h1 class="text-4xl">{{ article.title }}</h1>

    <!-- 作成日 -->
    <div class="flex flex-row text-gray-600 mt-4">
      <div class="mr-2">Created:</div>
      <time :datetime="$dayjs(article.date).format('YYYY-MM-DD')">{{
        $dayjs(article.date).format('YYYY/MM/DD')
      }}</time>
    </div>

    <!-- タグ -->
    <div class="flex flex-row text-gray-600">
      <div class="mr-2">Tags:</div>
      <div
        v-for="(tag, j) in article.tags"
        :key="tag.id"
        :class="{ 'ml-2': j > 0 }"
      >
        <nuxt-link :to="`/tags/${tag.id}`" class="github-anchor">
          {{ tag.name }}
        </nuxt-link>
      </div>
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
