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
import Vue from 'vue'
import { ContentArticle } from '~/interfaces/ContentArticle'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const articles = (await $content('articles')
      .where({ id: parseInt(params.id) })
      .fetch()) as ContentArticle[]

    if (articles.length === 0) {
      // 記事データが存在しない場合はエラー
      // https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
      error({ statusCode: 404, message: 'Not Found' })
    }

    const article = articles[0]

    // 前後の記事
    // https://content.nuxtjs.org/ja/examples#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
    const [prev, next] = (await $content('articles')
      .only(['id'])
      .sortBy('id')
      // articles以下のファイル名を指定する
      // CSRの場合はparams.idの型がnumberになるのでstringに変換する
      .surround(params.id.toString())
      .fetch()) as ContentArticle[]

    return {
      article,
      next,
      prev,
    }
  },
  data() {
    const defaultValue: ContentArticle = {
      dir: '',
      path: '',
      extension: '',
      slug: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      id: -1,
      title: '',
      date: '',
      tags: [],
    }

    return {
      article: defaultValue,
      next: defaultValue,
      prev: defaultValue,
    }
  },
  head() {
    // 型推論が効かないので型を明示する
    const article = this.article as ContentArticle

    const title = article.title
    const joinedTagsName = article.tags.map((t) => t.name).join(',')
    const description = `「${article.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagsName}」を含みます。`

    const breadcrumbSchemaString = this.$createBreadcrumbSchema([
      {
        name: 'トップページ',
        path: '/',
      },
      {
        name: title,
        path: `/articles/${article.id}`,
      },
    ])
    const articleSchemaString = this.$createArticleSchema(article)

    return {
      title,
      meta: [
        {
          name: 'description',
          content: description,
        },
        {
          property: 'og:title',
          content: `${title} | Yurikago Blog`,
        },
        {
          property: 'og:type',
          content: 'article',
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:url',
          content: process.env.FRONT_URL + this.$route.path,
        },
      ],
      script: [
        // 構造化マークアップ
        {
          hid: 'breadcrumbSchema',
          innerHTML: breadcrumbSchemaString,
          type: 'application/ld+json',
        },
        {
          hid: 'articleSchema',
          innerHTML: articleSchemaString,
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML'],
        articleSchema: ['innerHTML'],
      },
    }
  },
})
</script>
