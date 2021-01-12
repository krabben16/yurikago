<template>
  <div class="d-flex justify-content-between">
    <nuxt-link
      v-if="surround.next"
      class="btn btn-outline-dark"
      :to="`/articles/${surround.next.id}`"
      role="button"
    >
      &larr; 次の記事
    </nuxt-link>
    <nuxt-link
      v-if="surround.prev"
      class="btn btn-outline-dark"
      :to="`/articles/${surround.prev.id}`"
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
    surround: {
      type: Object as () => {
        prev: ContentSurround | null
        next: ContentSurround | null
      },
      required: true,
    },
  },
})
</script>
