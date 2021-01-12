<template>
  <div class="d-flex justify-content-between">
    <nuxt-link
      v-if="next"
      class="btn btn-outline-dark"
      :to="{ name: 'articles-id', params: { id: next.id } }"
      role="button"
    >
      &larr; 次の記事
    </nuxt-link>
    <nuxt-link
      v-if="prev"
      class="btn btn-outline-dark"
      :to="{ name: 'articles-id', params: { id: prev.id } }"
      role="button"
    >
      前の記事 &rarr;
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentSurround } from '~/interfaces/Content'

export default defineComponent({
  props: {
    next: {
      type: Object as () => ContentSurround,
      required: false,
    },
    prev: {
      type: Object as () => ContentSurround,
      required: false,
    },
  },
})
</script>
