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
              class="badge badge-dark"
            >
              {{ articleTag.tag.name }}
            </nuxt-link>
          </div>
        </div>
        <h2>{{ article.title }}</h2>
      </div>
      <div class="article-body">
        <Markdown :markdownContent="article.markdown" />
      </div>
    </div>
    <div class="disqus-wrapper">
      <vue-disqus
        shortname="yurikago-blog"
        :identifier="$route.path"
        :url="'https://www.yurikago-blog.com' + $route.path"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Markdown from "~/components/Markdown.vue"

export default {
  components: {
    Markdown
  },
  async asyncData(context) {
    const article = await context.app.$axios.get(`/articles/${context.params.id}`)
    return {
      id: context.params.id,
      article: article.data
    }
  },
  computed: {
    ...mapGetters("articles", ["landingArticleID"])
  },
  mounted() {
    if (!this.landingArticleID) {
      this.changeLandingArticleID(this.id)
    }

    // パンくず
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.article.title,
        path: this.$route.path
      }
    ]
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("articles", ["changeLandingArticleID"]),
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
    return {
      title: this.article.title,
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/styles/zenburn.min.css",
          type: "text/css"
        }
      ],
      script: [
        // 構造化マークアップ
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.article.title, this.$route.path),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.article-header {
  h2 {
    margin: 40px 0;
  }

  .clearfix::after {
    display: block;
    clear: both;
  }

  .tags {
    float: right;

    .badge:nth-child(n + 2) {
      margin-left: 10px;
    }
  }
}

.disqus-wrapper {
  margin-top: 60px;
  background-color: white;
}
</style>
