<template>
  <div>
    <div v-for="(article, i) in articles" :key="article.id">
      <!-- 記事タイトル -->
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
        <p class="lead">{{ article.title }}</p>
      </nuxt-link>

      <!-- 作成日 -->
      <div>
        <fa-icon class="mr-1" :icon="['far', 'clock']" />
        {{ article.date }}
      </div>

      <!-- タグ -->
      <div>
        <fa-icon class="mr-1" :icon="['fas', 'tag']" />
        <nuxt-link
          v-for="(tag, i) in article.tags"
          :key="tag.id"
          :to="{ name: 'tags-id', params: { id: tag.id } }"
          :class="{ 'ml-2': i > 0 }"
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
