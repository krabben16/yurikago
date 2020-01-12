<template>
  <div>
    <div>
      <div>{{ article.date }}</div>
      <div>
        <nuxt-link v-for="tag in article.tags" :key="tag.id" :to="{ name: 'tags-id', params: { id: tag.id } }" class="badge badge-light">{{ tag.name }}</nuxt-link>
      </div>
      <h2>{{ article.title }}</h2>
    </div>
    <Markdown :markdownContent="article.content"></Markdown>
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

.badge:nth-child(n+2) {
  margin-left: 10px;
}
</style>
