<template>
  <div>
    <div v-for="(article, i) in articles" :key="article.id">
      <!-- 記事タイトル -->
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
        <strong>{{ article.title }}</strong>
      </nuxt-link>

      <!-- 作成日 -->
      <div class="mt-1">
        <span class="mr-1">Created: </span>
        {{ $dayjs(article.date).format('YYYY/MM/DD') }}
      </div>

      <!-- タグ -->
      <div class="mt-1">
        <span class="mr-1">Tags: </span>
        <nuxt-link
          v-for="(tag, j) in article.tags"
          :key="tag.id"
          :to="{ name: 'tags-id', params: { id: tag.id } }"
          :class="{ 'ml-2': j > 0 }"
        >
          {{ tag.name }}
        </nuxt-link>
      </div>

      <!-- 区切り -->
      <hr v-if="i < articles.length - 1" />
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
  },
})
</script>
