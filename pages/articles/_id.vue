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

<script lang="ts">
import Vue from "vue"
import { BreadcrumbItem } from "interfaces/BreadcrumbItem"

interface DataType {
  article: any,
  next: any,
  prev: any
}

export default Vue.extend({
  async asyncData (context): Promise<DataType> {
    let article

    try {
      // NOTE: context.params.idはstringで型推論されるが実際はnumber型なので注意
      article = await context.$content(`articles/${context.params.id}`).fetch()
    } catch {
      // 記事データが存在しない場合はエラー
      // https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
      context.error({ statusCode: 404, message: "Not Found" })
    }

    // 前後の記事
    // https://content.nuxtjs.org/ja/examples#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
    const [prev, next] = await context.$content("articles").only(["id"]).sortBy("id").surround(context.params.id.toString()).fetch()

    return {
      article,
      next,
      prev
    }
  },
  // NOTE: computedやheadでvueインスタンスのプロパティの型推論をさせるためにdataを定義する
  data (): DataType {
    return {
      article: {},
      next: {},
      prev: {}
    }
  },
  computed: {
    joinedTagsName (): string {
      return this.article.tags.map((t: any) => t.name).join(",")
    }
  },
  head () {
    const titleValue: string = this.article.title
    const descriptionValue: string = `「${this.article.title}」についてまとめた記事です。この記事は以下のキーワード「${this.joinedTagsName}」を含みます。`
    const breadcrumbItemList: BreadcrumbItem[] = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: titleValue,
        path: `/articles/${this.article.id}`
      }
    ]

    const breadcrumbSchemaString: string = this.$createBreadcrumbSchema(breadcrumbItemList)
    const articleSchemaString: string = this.$createArticleSchema(this.article)

    return {
      title: titleValue,
      meta: [
        {
          name: "description",
          content: descriptionValue
        },
        {
          property: "og:title",
          content: `${titleValue} | Yurikago Blog`
        },
        {
          property: "og:type",
          content: "article"
        },
        {
          property: "og:description",
          content: descriptionValue
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
          innerHTML: breadcrumbSchemaString,
          type: "application/ld+json"
        },
        {
          hid: "articleSchema",
          innerHTML: articleSchemaString,
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"],
        articleSchema: ["innerHTML"]
      }
    }
  }
})
</script>
