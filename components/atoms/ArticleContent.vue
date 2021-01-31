<template>
  <nuxt-content :document="document" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticle } from '~/interfaces/content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => IContentArticle,
      required: true,
    },
  },
})
</script>

<style scoped>
blockquote {
  overflow-wrap: break-word;
}

code {
  font-weight: initial;
  font-size: initial;
  @apply bg-gray-200 border-2 border-gray-400 border-dashed rounded px-1;
}

code::before,
code::after {
  content: initial;
}
</style>
