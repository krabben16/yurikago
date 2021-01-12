<template>
  <div class="min-vh-100 px-3 px-sm-5 py-5 bg-white rounded">
    <ArticleHeader v-if="article" :article="article" />
    <!-- <ArticleToc v-if="article" class="mt-5" :toc="article.toc" /> -->
    <nuxt-content
      v-if="article"
      class="markdown-body mt-5"
      :document="article"
    />
    <Disqus v-if="article" class="mt-5" lang="ja" />
    <ArticlePager
      v-if="surround"
      class="mt-5"
      :next="surround[1]"
      :prev="surround[0]"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
  watchEffect,
} from '@nuxtjs/composition-api'
import { BreadcrumbSchema, ArticleSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/lib/head/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, $dayjs, error, params, route } = useContext()

    const article = useAsync(async () => {
      const articleId = parseInt(params.value.id)
      const data = await $content('articles').where({ id: articleId }).fetch()
      return Array.isArray(data) ? data[0] : data
    }, `fetchArticle_${params.value.id}`)

    watchEffect(() => {
      // console.info(article.value)
      if (article.value?.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
      }
    })

    const surround = useAsync(async () => {
      const slug = params.value.id
      const data = await $content('articles')
        .only('id')
        .sortBy('id')
        .surround(slug)
        .fetch()
      return Array.isArray(data) ? data : [data]
    }, `fetchSurround_${params.value.id}`)

    useMeta(() => {
      const refVal = article.value
      const data = refVal || {
        title: '',
        id: -1,
        date: '',
      }

      const title = data.title
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
        articleId: data.id,
        headlineValue: title,
        datePublishedValue: $dayjs(data.date).format('YYYY-MM-DDTHH:mm:ssZ'),
        dateModifiedValue: $dayjs(data.date).format('YYYY-MM-DDTHH:mm:ssZ'),
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
      article,
      surround,
    }
  },
})
</script>
