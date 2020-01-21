<template>
  <div class="content">
    <div class="article-header">
      <div>{{ article.posted_at }}</div>
      <div class="clearfix">
        <div class="tags">
          <nuxt-link
            v-for="tag in article.tags"
            :key="tag.id"
            :to="{ name: 'articles-tag-id', params: { id: tag.id } }"
            class="badge badge-light">
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
      <h2>{{ article.title }}</h2>
    </div>
    <div class="article-body">
      <Markdown :markdownContent="article.markdown"></Markdown>
    </div>
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
    ...mapGetters('articles', ['landingArticleID'])
  },
  methods: {
    ...mapActions('articles', ['changeLandingArticleID'])
  },
  async asyncData (context) {
    const article = await context.app.$axios.$get(`/query/articles/${context.params.id}`)
    return {
      id: context.params.id,
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
.article-header {
  h2 {
    margin: 30px 0;
  }

  .clearfix::after {
    display: block;
    clear: both;
  }
  
  .tags {
    float: right;

    .badge:nth-child(n+2) {
      margin-left: 10px;
    }
  }
}
</style>
