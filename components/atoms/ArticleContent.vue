<template>
  <nuxt-content :document="document" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticle } from '~/interfaces/Content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => IContentArticle,
      required: true,
    },
  },
})
</script>

<style lang="scss" scoped>
blockquote {
  overflow-wrap: break-word;
}
</style>
