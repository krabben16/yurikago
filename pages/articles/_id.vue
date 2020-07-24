<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-10 mx-sm-auto">
              <div>
                <i class="far fa-clock mr-1" />
                {{ article.posted_at }}
              </div>
              <div class="mt-2">
                <i class="fas fa-tag mr-1" />
                <!-- NOTE: 二個目のタグからマージンを設定する -->
                <nuxt-link
                  v-for="(tag, i) in article.tags"
                  :key="tag.id"
                  :to="{ name: 'articles-tag-id', params: { id: tag.id } }"
                  :class="{ 'ml-2': i > 0 }"
                >
                  {{ tag.name }}
                </nuxt-link>
              </div>
              <h1 class="mt-5">{{ article.title }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 pb-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <Markdown :markdown-content="article.content" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 pb-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <div class="container">
                <div class="row">
                  <div class="col-6 text-center twitter py-2">
                    <TwitterIcon :url="frontUrl + $route.path" :title="title" />
                  </div>
                  <div class="col-6 text-center line py-2">
                    <LineIcon :url="frontUrl + $route.path" :title="title" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <Disqus lang="ja" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Markdown from "~/components/Markdown.vue"
import TwitterIcon from "~/components/ShareNetwork/TwitterIcon.vue"
import LineIcon from "~/components/ShareNetwork/LineIcon.vue"
import { mapGetters, mapActions } from "vuex"
import { getJoinedTagsName } from "~/plugins/tags.js"
import { getArticleById } from "~/plugins/articles.js"

export default {
  components: {
    Markdown,
    TwitterIcon,
    LineIcon
  },
  async asyncData(context) {
    const id = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    const article = getArticleById(id)

    // 記事データが存在しない場合はエラーページに遷移する
    // @see https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
    if (!article) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      article: article,
      frontUrl: process.env.FRONT_URL
    }
  },
  computed: {
    ...mapGetters("articles", ["landingArticleID"])
  },
  created() {
    // TDK
    this.title = this.article.title
    const joinedTagsName = getJoinedTagsName(this.article.tags)
    this.description = `「${this.article.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagsName}」を含みます。`

    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/articles/${this.article.id}`
      }
    ]
  },
  mounted() {
    if (!this.landingArticleID) {
      this.changeLandingArticleID(this.article.id)
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
          name: "description",
          content: this.description
        },
        {
          property: "og:title",
          content: `${this.title} | Yurikago Blog`
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:description",
          content: this.description
        },
        {
          property: "og:url",
          content: process.env.FRONT_URL + this.$route.path
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
