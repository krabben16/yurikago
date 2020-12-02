<template>
  <div class="card-columns">
    <div v-for="article in articles" :key="article.id" class="card shadow-sm">
      <div class="card-body">
        <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
          <h3 class="card-title">
            {{ article.title }}
          </h3>
        </nuxt-link>

        <p class="card-text">on {{ article.date }}</p>

        <nuxt-link
          v-for="tag in article.tags"
          :key="tag.id"
          :to="{ name: 'tags-id', params: { id: tag.id } }"
          class="btn btn-outline-dark m-1"
          role="button"
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
    articles: {
      type: Array as () => ContentArticle[],
      required: true,
    },
  },
})
</script>
