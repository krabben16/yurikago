<template>
  <div class="card py-3 shadow-sm">
    <div class="card-body">
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
        <h3>
          {{ article.title }}
        </h3>
      </nuxt-link>
      <div class="mt-3">
        <fa-icon class="mr-1" :icon="['far', 'clock']" />
        {{ article.date }}
      </div>
      <div class="mt-2">
        <fa-icon class="mr-1" :icon="['fas', 'tag']" />
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
