<template>
  <div>
    <div class="p-article">
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
      <Markdown :markdown-content="article.markdown" />
    </div>
    <div class="c-disqus">
      <vue-disqus shortname="yurikago-blog" :identifier="$route.path" :url="$constant.FRONT_URL + $route.path" />
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
    const title = article.data.title
    return {
      id: context.params.id,
      article: article.data,
      title: title,
      breadcrumbItemList: [
        {
          name: "トップページ",
          path: "/"
        },
        {
          name: title,
          path: `/articles/${context.params.id}`
        }
      ]
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
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("articles", ["changeLandingArticleID"]),
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
    return {
      title: this.title,
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
          innerHTML: this.$getBreadcrumbSchema(this.breadcrumbItemList),
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
