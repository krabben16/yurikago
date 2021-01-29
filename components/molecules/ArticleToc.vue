<template>
  <div class="article-toc">
    <span>TOC:</span>
    <div v-for="(v, k) in toc" :key="k">
      <nuxt-link
        :to="`#${v.id}`"
        class="article-toc-item"
        @click.native="$ga.event('view', 'click', 'toc')"
      >
        {{ v.text }}
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { IContentArticleToc } from '~/interfaces/Content'

export default defineComponent({
  props: {
    toc: {
      type: Array as () => IContentArticleToc[],
      required: true,
    },
  },
})
</script>
