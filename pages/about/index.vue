<template>
  <div v-html="compiledMarkdown"></div>
</template>

<script>
import marked from 'marked'

import profile from '~/assets/markdown/about/profile.md'

export default {
  computed: {
    compiledMarkdown () {
      return marked(this.markdownText)
    }
  },
  asyncData ({ context }) {
    return {
      markdownText: profile
    }
  },
  head () {
    return {
      title: "About"
    }
  }
}
</script>
