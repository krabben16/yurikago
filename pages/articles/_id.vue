<template>
  <div>
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="min-vh-100 px-sm-5 py-5 bg-white rounded">
        <ArticleHeader :article="article" />
        <!-- <ArticleToc class="mt-5" :toc="article.toc" /> -->
        <nuxt-content class="markdown-body mt-5" :document="article" />
        <Disqus class="mt-5" lang="ja" />
        <ArticlePager class="mt-5" :next="surround[1]" :prev="surround[0]" />
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
import { ContentFunctions as cf } from '~/resources/content/article'

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
        const existsArticle = await cf.existsArticleById($content, articleId)

        if (!existsArticle) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        return await cf.fetchArticleById($content, articleId)
      }

      async function fetchSurround() {
        const articleId = parseInt(params.value.id)
        return await cf.fetchSurroundById($content, articleId)
      }

      async function fetchMeta(): Promise<ArticleHead> {
        const articleId = parseInt(params.value.id)
        const existsArticle = await cf.existsArticleById($content, articleId)

        if (!existsArticle) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        const article = await cf.fetchArticleById($content, articleId)

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
