<template>
  <Markdown :markdownContent="arigatoContent"></Markdown>
</template>

<script>
import Markdown from '~/components/Markdown.vue'
import content from '~/assets/markdown/arigato.md'

export default {
  components: {
    Markdown
  },
  computed: {
    arigatoContent () {
      return content
    }
  },
  data () {
    return {
      title: 'ありがとうございます'
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
