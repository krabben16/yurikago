<template>
  <nuxt-link :to="`/tags/${tag.id}`">
    {{ tag.name }}
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticleTag } from '~/interfaces/Content'

export default defineComponent({
  props: {
    tag: {
      type: Object as () => ContentArticleTag,
      required: true,
    },
  },
})
</script>
