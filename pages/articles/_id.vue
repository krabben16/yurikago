<template>
  <div class="container-fluid min-vh-100">
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <!-- タイトル -->
      <div class="row py-5">
        <div class="col-12 col-sm-6 mx-sm-auto">
          <div>
            <fa-icon class="mr-1" :icon="['far', 'clock']" />
            {{ article.date }}
          </div>
          <div class="mt-2">
            <fa-icon class="mr-1" :icon="['fas', 'tag']" />
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
      <!-- TOC -->
      <div class="row pt-5 bg-white">
        <div class="col-l2 col-sm-5 mx-sm-auto">
          <ArticleToc :toc="article.toc" />
        </div>
      </div>
      <!-- 本文 -->
      <div class="row py-5 bg-white">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <nuxt-content :document="article" />
        </div>
      </div>
      <!-- コメント -->
      <div class="row py-5">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <Disqus lang="ja" />
        </div>
      </div>
      <!-- ページャー -->
      <div class="row py-5 bg-white">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <ArticlePager :next="next" :prev="prev" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'
import { createHeadObject } from '~/resources/head/article'
import { fetchArticlesById, fetchSurround } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articleRef = ref<ContentArticle>()
    const nextRef = ref<ContentSurround>()
    const prevRef = ref<ContentSurround>()

    useFetch(async () => {
      const articles = await fetchArticlesById($content, params.value.id)

      // 記事データが存在しない場合はエラー
      // https://ja.nuxtjs.org/api/context/#-code-error-code-em-function-em-
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        // $fetchState.error
        throw new Error('Not Found')
      }

      // 前後の記事
      // https://content.nuxtjs.org/ja/examples#%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%8D%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3
      const surround = await fetchSurround($content, params.value.id)
      const [prev, next] = surround

      articleRef.value = articles[0]
      prevRef.value = prev
      nextRef.value = next
    })

    useMeta(() => {
      if (!articleRef.value) return {}

      const joinedTagsName = articleRef.value.tags.map((t) => t.name).join(',')

      const title = articleRef.value.title
      const description = `「${articleRef.value.title}」についてまとめた記事です。この記事は以下のキーワード「${joinedTagsName}」を含みます。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: `/articles/${articleRef.value.id}`,
          },
        ],
      }

      const articleSchema = {
        articleId: articleRef.value.id,
        headlineValue: title,
        datePublishedValue: `${articleRef.value.date}T00:00:00+09:00`,
        dateModifiedValue: `${articleRef.value.date}T00:00:00+09:00`,
      }

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
        articleSchema,
      })
    })

    return {
      article: articleRef,
      next: nextRef,
      prev: prevRef,
    }
  },
})
</script>
