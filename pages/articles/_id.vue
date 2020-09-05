<template>
  <div class="container-fluid">
    <div class="row">
      <!-- タイトル -->
      <div class="col-12 py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-10 mx-sm-auto">
              <div>
                <i class="far fa-clock mr-1" />
                {{ article.date }}
              </div>
              <div class="mt-2">
                <i class="fas fa-tag mr-1" />
                <!-- NOTE: 二個目のタグからマージンを設定する -->
                <nuxt-link
                  v-for="(tag, i) in article.tags"
                  :key="tag.id"
                  :to="{ name: 'tags-id', params: { id: tag.id } }"
                  :class="{ 'ml-2': i > 0 }"
                >
                  {{ tag.name }}
                </nuxt-link>
              </div>
              <h1 class="mt-5">
                {{ article.title }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- 本文 -->
      <div class="col-12 py-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <nuxt-content class="markdown-body" :document="article" />
            </div>
          </div>
        </div>
      </div>
      <!-- コメント -->
      <div class="col-12 py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <Disqus lang="ja" />
            </div>
          </div>
        </div>
      </div>
      <!-- ページャー -->
      <div class="col-12 py-5 bg-white">
        <div class="container">
          <div class="row">
            <div class="col-12 col-sm-9 mx-sm-auto">
              <nuxt-link
                v-if="next"
                class="btn btn-dark float-left"
                :to="{ name: 'articles-id', params: { id: next.id } }"
                role="button"
              >
                &larr; 次の記事
              </nuxt-link>
              <nuxt-link
                v-if="prev"
                class="btn btn-dark float-right"
                :to="{ name: 'articles-id', params: { id: prev.id } }"
                role="button"
              >
                前の記事 &rarr;
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"

export default {
  async asyncData (context) {
    const id = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    let article = {}

    try {
      article = await context.$content(`articles/${id}`).fetch()
    } catch {
      // 記事データが存在しない場合はエラーページに遷移する
      // https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    // 前後の記事
    // https://content.nuxtjs.org/ja/examples#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
    const [prev, next] = await context.$content("articles").only(["id"]).sortBy("id").surround(id.toString()).fetch()

    return {
      article,
      prev,
      next
    }
  },
  created () {
    // TDK
    this.title = this.article.title
    const joinedTagsName = this.getJoinedTagsName(this.article.tags)
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
  mounted () {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"]),
    getJoinedTagsName (tagList) {
      return tagList.join(",")
    }
  },
  head () {
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
      script: [
        // 構造化マークアップ
        {
          hid: "breadcrumbSchema",
          innerHTML: this.$getBreadcrumbSchema(this.breadcrumbItemList),
          type: "application/ld+json"
        },
        {
          hid: "articleSchema",
          innerHTML: this.$createArticleSchemaString(this.article),
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
