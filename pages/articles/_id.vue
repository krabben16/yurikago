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
import { articleList } from '~/const/articleList'
import { contentList } from '~/const/contentList'

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
  asyncData ({ params }) {
    let article = null
    articleList.map(v => {
      if (params.id == v.id) {
        article = v
      }
    })
    article.content = contentList[params.id]
    return {
      id: params.id,
      article: article
    }
  },
  created () {
    if (!this.landingArticleID) {
      this.changeLandingArticleID(this.id)
    }
  },
  head () {
    return {
      title: this.article.title,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.article.title, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
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
