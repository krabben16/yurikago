<template>
  <ul>
    <li v-for="(v, k) in toc" :key="k">
      <nuxt-link :to="`#${v.id}`">{{ v.text }}</nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { ContentArticleToc } from '~/interfaces/Content'

export default defineComponent({
  props: {
    toc: {
      type: Array as () => ContentArticleToc[],
      required: true,
    },
  },
})
</script>
