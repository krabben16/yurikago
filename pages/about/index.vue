<template>
  <Markdown :markdownContent="profileContent"></Markdown>
</template>

<script>
import Markdown from '~/components/Markdown.vue'

import content from '~/assets/markdown/about/profile.md'

export default {
  components: {
    Markdown
  },
  computed: {
    profileContent () {
      return content
    }
  },
  data () {
    return {
      title: 'About'
    }
  },
  head () {
    return {
      title: this.title
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.title)
  },
}
</script>
