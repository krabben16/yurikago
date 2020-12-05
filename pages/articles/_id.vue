<template>
  <div>
    <template v-if="!article || !surround">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 bg-white rounded shadow-sm">
        <div class="row pt-5">
          <div class="col-12">
            <!-- 記事タイトル -->
            <h1>{{ article.title }}</h1>

            <!-- 作成日 -->
            <div class="mt-3">
              <fa-icon class="mr-1" :icon="['far', 'clock']" />
              {{ $dayjs(article.date).format('YYYY/MM/DD') }}
            </div>

            <!-- タグ -->
            <div class="mt-2">
              <fa-icon class="mr-1" :icon="['fas', 'tag']" />
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
        <!-- <div class="row pt-5">
          <div class="col-l2">
            <ArticleToc :toc="article.toc" />
          </div>
        </div> -->
        <!-- 本文 -->
        <div class="row pt-5">
          <div class="col-12">
            <nuxt-content :document="article" />
          </div>
        </div>
        <!-- コメント -->
        <div class="row pt-5">
          <div class="col-12">
            <Disqus lang="ja" />
          </div>
        </div>
        <!-- ページャー -->
        <div class="row pt-5 pb-5">
          <div class="col-12">
            <ArticlePager :next="surround[1]" :prev="surround[0]" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
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
    const articleId = parseInt(params.value.id)

    const articleRef = useAsync(async () => {
      const existsArticle = await existsArticleById($content, articleId)

      if (!existsArticle) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return await fetchArticleById($content, articleId)
    })

    const surroundRef = useAsync(async () => {
      const surround = await fetchSurround($content, articleId)
      const [prev, next] = surround

      return {
        next,
        prev,
      }
    })

    useMeta(() => {
      if (!articleRef.value) return {}

      const title = articleRef.value.title
      const description = `「${title}」についてまとめた記事です。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
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

      const articleSchema = {
        articleId: articleRef.value.id,
        headlineValue: title,
        datePublishedValue: $dayjs(articleRef.value.date).format(
          'YYYY-MM-DDTHH:mm:ssZ'
        ),
        dateModifiedValue: $dayjs(articleRef.value.date).format(
          'YYYY-MM-DDTHH:mm:ssZ'
        ),
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
      surround: surroundRef,
    }
  },
})
</script>
