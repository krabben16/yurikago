<template>
  <div class="flex justify-between text-gray-600">
    <nuxt-link
      v-if="surround.next"
      :to="`/articles/${surround.next.id}`"
      class="underline"
    >
      &larr; {{ surround.next.title }}
    </nuxt-link>
    <nuxt-link
      v-if="surround.prev"
      :to="`/articles/${surround.prev.id}`"
      class="underline"
    >
      {{ surround.prev.title }} &rarr;
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
