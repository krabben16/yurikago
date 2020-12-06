<template>
  <div>
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 py-5 bg-white rounded shadow-sm">
        <!-- パンくず -->
        <div class="row">
          <div class="col-12">
            <Breadcrumb :items="meta.breadcrumbSchema.items" />
          </div>
        </div>
        <!-- 記事ヘッダー -->
        <div class="row pt-5">
          <div class="col-12">
            <!-- タイトル -->
            <h1>{{ article.title }}</h1>

            <!-- 作成日 -->
            <div class="mt-3">
              <span class="mr-1">Created: </span>
              {{ $dayjs(article.date).format('YYYY/MM/DD') }}
            </div>

            <!-- タグ -->
            <div>
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
        <!-- <div class="row pt-5">
          <div class="col-12">
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
        <div class="row pt-5">
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
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { ArticleHead } from '~/interfaces/Head'
import { BreadcrumbSchema, ArticleSchema } from '~/interfaces/Schema'
import { ContentArticle, ContentSurround } from '~/interfaces/Content'
import { createHeadObject } from '~/resources/head/article'
import { ContentFunctions } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, $dayjs, error, params, route } = useContext()

    const article = ref<ContentArticle>()
    const surround = ref<ContentSurround[]>()
    const meta = ref<ArticleHead>()

    useFetch(async () => {
      async function fetchArticle() {
        const articleId = parseInt(params.value.id)
        const existsArticle = await ContentFunctions.existsArticleById(
          $content,
          articleId
        )

        if (!existsArticle) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        return await ContentFunctions.fetchArticleById($content, articleId)
      }

      async function fetchSurround() {
        const articleId = parseInt(params.value.id)
        return await ContentFunctions.fetchSurroundById($content, articleId)
      }

      async function fetchMeta(): Promise<ArticleHead> {
        const articleId = parseInt(params.value.id)
        const existsArticle = await ContentFunctions.existsArticleById(
          $content,
          articleId
        )

        if (!existsArticle) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        const article = await ContentFunctions.fetchArticleById(
          $content,
          articleId
        )

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
          datePublishedValue: $dayjs(article.date).format(
            'YYYY-MM-DDTHH:mm:ssZ'
          ),
          dateModifiedValue: $dayjs(article.date).format(
            'YYYY-MM-DDTHH:mm:ssZ'
          ),
        }

        return {
          title,
          description,
          path,
          breadcrumbSchema,
          articleSchema,
        }
      }

      article.value = await fetchArticle()
      surround.value = await fetchSurround()
      meta.value = await fetchMeta()
    })

    useMeta(() => {
      if (!meta.value) return {}
      return createHeadObject(meta.value)
    })

    return {
      article,
      surround,
      meta,
    }
  },
})
</script>
