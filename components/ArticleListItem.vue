<template>
  <div class="py-3">
    <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
      <h3>
        {{ article.title }}
      </h3>
    </nuxt-link>
    <div class="mt-3">
      <i class="far fa-clock mr-1" />
      {{ article.date }}
    </div>
    <div class="mt-2">
      <i class="fas fa-tag mr-1" />
      <!-- NOTE: 二個目のタグからマージンを設定する -->
      <nuxt-link
        v-for="(tag, i) in article.tags"
        :key="tag.id"
        :to="{ name: 'tags-id', params: { id: tag.id } }"
        :class="{ 'ml-2': i > 0 }"
      >
        {{ tag.name }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { ContentArticle } from '~/interfaces/ContentArticle.ts'

export default Vue.extend({
  props: {
    article: {
      type: Object,
      required: true,
    } as PropOptions<ContentArticle>,
  },
})
</script>
