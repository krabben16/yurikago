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
            class="badge badge-light"
          >
            {{ articleTag.tag.name }}
          </nuxt-link>
        </div>
      </div>
      <h2>{{ article.title }}</h2>
      <Markdown :markdown-content="article.markdown" />
    </div>
    <div class="c-disqus">
      <vue-disqus
        :shortname="$constant.DISQUS_SHORTNAME"
        :identifier="$route.path"
        :url="$constant.FRONT_URL + $route.path"
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
  created() {
    this.title = this.article.title
    const joinedTagName = this.$getJoinedTagName(this.article.article_tags)
    this.description = `「${this.article.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagName}」を含みます。`
    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/${this.id}`
      }
    ]
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
      meta: [
        {
          "description": this.description
        }
      ],
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
        },
        {
          hid: "articleSchema",
          innerHTML: this.$getArticleSchema(this.article),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"],
        articleSchema: ["innerHTML"]
      }
    }
  }
}
</script>
