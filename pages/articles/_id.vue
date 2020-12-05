<template>
  <div class="container min-vh-100 px-sm-5 bg-white rounded shadow-sm">
    <!-- パンくず -->
    <div v-if="meta" class="row pt-5">
      <div class="col-12">
        <Breadcrumb :items="meta.breadcrumbSchema.items" />
      </div>
    </div>
    <!-- 記事ヘッダー -->
    <div v-if="article" class="row pt-5">
      <div class="col-12">
        <!-- タイトル -->
        <h1>{{ article.title }}</h1>

        <!-- 作成日 -->
        <div class="mt-3">
          <span class="mr-1">Created: </span>
          {{ $dayjs(article.date).format('YYYY/MM/DD') }}
        </div>

        <!-- タグ -->
        <div class="mt-1">
          <span class="mr-1">Tags: </span>
          <nuxt-link
            v-for="(tag, i) in article.tags"
            :key="tag.id"
            :to="{ name: 'tags-id', params: { id: tag.id } }"
            :class="{ 'ml-2': i > 0 }"
          >
            {{ tag.name }}
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- TOC -->
    <!-- <div v-if="article" class="row pt-5">
      <div class="col-l2">
        <ArticleToc :toc="article.toc" />
      </div>
    </div> -->
    <!-- 本文 -->
    <div v-if="article" class="row pt-5">
      <div class="col-12">
        <nuxt-content :document="article" />
      </div>
    </div>
    <!-- コメント -->
    <div v-if="article" class="row pt-5">
      <div class="col-12">
        <Disqus lang="ja" />
      </div>
    </div>
    <!-- ページャー -->
    <div v-if="surround" class="row pt-5 pb-5">
      <div class="col-12">
        <ArticlePager :next="surround.next" :prev="surround.prev" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { BreadcrumbSchema, ArticleSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/resources/head/article'
import {
  fetchArticleById,
  fetchSurround,
  existsArticleById,
} from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, $dayjs, error, params, route } = useContext()

    const article = useAsync(async () => {
      const articleId = parseInt(params.value.id)
      const existsArticle = await existsArticleById($content, articleId)

      if (!existsArticle) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return await fetchArticleById($content, articleId)
    })

    const surround = useAsync(async () => {
      const articleId = parseInt(params.value.id)
      const surround = await fetchSurround($content, articleId)
      const [prev, next] = surround

      return {
        next,
        prev,
      }
    })

    const meta = useAsync(async () => {
      const articleId = parseInt(params.value.id)
      const existsArticle = await existsArticleById($content, articleId)

      if (!existsArticle) {
        return null
      }

      const article = await fetchArticleById($content, articleId)

      const title = article.title
      const description = `「${title}」についてまとめた記事です。`
      const path = route.value.path

      const breadcrumbSchema: BreadcrumbSchema = {
        items: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: route.value.path,
          },
        ],
      }

      const articleSchema: ArticleSchema = {
        articleId: article.id,
        headlineValue: title,
        datePublishedValue: $dayjs(article.date).format('YYYY-MM-DDTHH:mm:ssZ'),
        dateModifiedValue: $dayjs(article.date).format('YYYY-MM-DDTHH:mm:ssZ'),
      }

      return {
        title,
        description,
        path,
        breadcrumbSchema,
        articleSchema,
      }
    })

    useMeta(() => {
      if (!meta.value) return {}

      return createHeadObject({
        title: meta.value.title,
        description: meta.value.description,
        path: meta.value.path,
        breadcrumbSchema: meta.value.breadcrumbSchema,
        articleSchema: meta.value.articleSchema,
      })
    })

    return {
      meta,
      article,
      surround,
    }
  },
})
</script>
