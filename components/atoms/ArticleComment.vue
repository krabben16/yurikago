<template>
  <Disqus lang="ja" :lazy-config="lazyConfig" />
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
  setup() {
    return {
      // default: { root: null, rootMargin: '300px', threshold: 0.5 }
      lazyConfig: {
        root: null,
        rootMargin: '0px 0px 900px 0px',
        threshold: 0.5,
      },
    }
  },
})
</script>
