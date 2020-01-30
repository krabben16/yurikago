<template>
  <div>
    <div class="content-wrapper">
      <div class="article-header">
        <div>{{ article.posted_at }}</div>
        <div class="clearfix">
          <div class="tags">
            <nuxt-link
              v-for="articleTag in article.article_tags"
              :key="articleTag.tag_id"
              :to="{ name: 'articles-tag-id', params: { id: articleTag.tag_id } }"
              class="badge badge-light">
              {{ articleTag.tag.name }}
            </nuxt-link>
          </div>
        </div>
        <h2>{{ article.title }}</h2>
      </div>
      <div class="article-body">
        <Markdown :markdownContent="article.markdown"></Markdown>
      </div>
    </div>
    <div class="disqus-wrapper">
      <vue-disqus shortname='yurikago-blog' :identifier="$route.path" :url="'https://www.yurikago-blog.com' + $route.path"></vue-disqus>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Markdown from '~/components/Markdown.vue'
import zenburn from 'highlight.js/styles/zenburn.css'

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
    const res = await context.app.$axios.$get(`/api/articles/${context.params.id}`)
    return {
      id: context.params.id,
      article: res
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
      link: [
        {
          rel: 'stylesheet',
          innerHTML: '/css/articles/zenburn.css',
          type: 'text/css'
        }
      ],
      script: [
        // 構造化マークアップ
        {
          hid: 'breadcrumbSchema',
          innerHTML: this.$getBreadcrumbSchema(this.article.title, this.$route.path),
          type: 'application/ld+json'
        }
      ],
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

.disqus-wrapper {
  margin-top: 60px;
  background-color: white;
}
</style>
