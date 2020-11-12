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
import {
  defineComponent,
  reactive,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'

async function fetchArticlesById($content: contentFunc, id: string) {
  const articles = await $content('articles')
    .where({ id: parseInt(id) })
    .fetch()

  return articles as ContentArticle[]
}

async function fetchSurround($content: contentFunc, id: string) {
  const surround = await $content('articles')
    .only(['id'])
    .sortBy('id')
    // articles以下のファイル名を指定する
    // CSRの場合はparams.idの型がnumberになるのでstringに変換する
    .surround(id.toString())
    .fetch()

  return surround as ContentSurround[]
}

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, app, error, params, route } = useContext()

    const defaultContentDocument = {
      dir: '',
      path: '',
      extension: '',
      slug: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const defaultContentArticle = {
      ...defaultContentDocument,
      id: -1,
      title: '',
      date: '',
      tags: [],
    } as ContentArticle

    const defaultContentSurround = {
      ...defaultContentDocument,
      id: -1,
    } as ContentSurround

    const state = reactive({
      article: defaultContentArticle,
      next: defaultContentSurround,
      prev: defaultContentSurround,
    })

    useAsync(async () => {
      const articles = await fetchArticlesById($content, params.value.id)

      // 記事データが存在しない場合はエラー
      // https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
      }

      // 前後の記事
      // https://content.nuxtjs.org/ja/examples#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
      const surround = await fetchSurround($content, params.value.id)
      const [prev, next] = surround

      state.article =
        articles.length === 0 ? defaultContentArticle : articles[0]
      state.prev = prev
      state.next = next
    })

    useMeta(() => {
      const joinedTagsName = state.article.tags.map((t) => t.name).join(',')

      const title = state.article.title
      const description = `「${state.article.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagsName}」を含みます。`
      const path = route.value.path

      const breadcrumbSchema = app.$createBreadcrumbSchema({
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: `/articles/${state.article.id}`,
          },
        ],
      })

      const articleSchema = app.$createArticleSchema({
        articleId: state.article.id,
        headlineValue: title,
        datePublishedValue: `${state.article.date}T00:00:00+09:00`,
        dateModifiedValue: `${state.article.date}T00:00:00+09:00`,
      })

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
            content: (process.env.FRONT_URL as string) + path,
          },
        ],
        script: [
          // 構造化マークアップ
          {
            hid: 'breadcrumbSchema',
            innerHTML: breadcrumbSchema,
            type: 'application/ld+json',
          },
          {
            hid: 'articleSchema',
            innerHTML: articleSchema,
            type: 'application/ld+json',
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          breadcrumbSchema: ['innerHTML'],
          articleSchema: ['innerHTML'],
        },
      }
    })

    return state
  },
})
</script>
