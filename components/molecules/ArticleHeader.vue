<template>
  <div>
    <!-- タイトル -->
    <h1 class="text-4xl">{{ document.title }}</h1>

    <!-- 作成日 -->
    <div class="flex flex-row">
      <span class="mr-2">Created:</span>
      <time :datetime="$dayjs(document.date).format('YYYY-MM-DD')">{{
        $dayjs(document.date).format('YYYY/MM/DD')
      }}</time>
    </div>

    <!-- カテゴリ -->
    <div class="flex flex-row">
      <span class="mr-2">Category:</span>
      <spna>
        {{ category.name }}
      </spna>
    </div>

    <!-- タグ -->
    <div class="flex flex-row">
      <span class="mr-2">Tags:</span>
      <span v-for="(tag, j) in tags" :key="tag.id" :class="{ 'ml-2': j > 0 }">
        <nuxt-link :to="`/tags/${tag.id}`">
          {{ tag.name }}
        </nuxt-link>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticle } from '~/interfaces/content'
import { createCategory } from '~/lib/category'
import { createTags } from '~/lib/tags'

export default defineComponent({
  props: {
    document: {
      type: Object as () => IContentArticle,
      required: true,
    },
  },
  setup({ document }) {
    return {
      category: createCategory(document.id),
      tags: createTags(document.id),
    }
  },
})
</script>
