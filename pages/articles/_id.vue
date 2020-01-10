<template>
  <div>
    <div>
      <div>{{ articleDate }}</div>
      <h2>{{ articleTitle }}</h2>
    </div>
    <Markdown :markdownContent="articleContent"></Markdown>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Markdown from '~/components/Markdown.vue'

export default {
  components: {
    Markdown
  },
  computed: {
    articleDate () {
      return this.article.date
    },
    articleTitle () {
      return this.article.title
    },
    articleContent () {
      return this.article.content
    },
    ...mapGetters('articles', ['landingArticleID'])
  },
  methods: {
    ...mapActions('articles', ['changeLandingArticleID'])
  },
  asyncData (context) {
    return {
      id: context.params.id,
      article: context.app.getArticleWithContent(context.params.id)
    }
  },
  created () {
    if (!this.landingArticleID) {
      this.changeLandingArticleID(this.id)
    }
  },
  head () {
    return {
      title: this.article.title
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.article.title)
  }
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 30px 0;
}
</style>
