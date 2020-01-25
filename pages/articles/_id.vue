<template>
  <div>
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
    <div class="disqus-wrapper">
      <div id="disqus_thread"></div>
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
      script: [
        // 構造化マークアップ
        {
          hid: 'breadcrumbSchema',
          innerHTML: this.$getBreadcrumbSchema(this.article.title, this.$route.path),
          type: 'application/ld+json'
        },
        // コメントフォーム
        {
          src: '/js/disqus.js',
          body: true
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
  margin-top: 40px;
  background-color: white;
}

/* SP */
@media screen and (max-width: 575px) {
  .disqus-wrapper {
    padding: 40px 20px;
  }
}

/* PC */
@media screen and (min-width: 576px) {
  .disqus-wrapper {
    padding: 40px 40px;
  }
}
</style>
