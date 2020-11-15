<template>
  <div>
    <p><strong>TOC</strong></p>
    <div v-for="(v, k) in toc" :key="k">
      <nuxt-link
        :to="`#${v.id}`"
        :class="`article-toc-item-${v.depth}`"
        @click.native="$ga.event('view', 'click', 'toc')"
      >
        {{ v.text }}
      </nuxt-link>
    </div>
  </div>
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
