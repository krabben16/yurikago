<template>
  <div>
    <div class="flex justify-start">
      <nuxt-link
        v-if="surround.next"
        :to="`/articles/${surround.next.id}`"
        class="github-anchor"
      >
        &larr; {{ surround.next.title }}
      </nuxt-link>
    </div>
    <div class="flex justify-end">
      <nuxt-link
        v-if="surround.prev"
        :to="`/articles/${surround.prev.id}`"
        class="github-anchor"
      >
        {{ surround.prev.title }} &rarr;
      </nuxt-link>
    </div>
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
