<template>
  <nuxt-content :document="document" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticle } from '~/interfaces/Content'

export default defineComponent({
  props: {
    document: {
      type: Object as () => ContentArticle,
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
