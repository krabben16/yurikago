<template>
  <article>
    <ArticleHeader v-if="res && res.article" :article="res.article" />
    <!-- <ArticleToc v-if="res && res.article" class="mt-8" :toc="res.article.toc" /> -->
    <ArticleContent
      v-if="res && res.article"
      class="mt-8"
      :document="res.article"
    />
    <ArticleComment
      v-if="res && res.article"
      class="mt-8"
      :document="res.article"
    />
    <ArticlePager v-if="res" class="mt-8" :surround="res.surround" />
  </article>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
  watchEffect,
} from '@nuxtjs/composition-api'
import { IBreadcrumbSchema, IArticleSchema } from '~/interfaces/schema'
import { createHeadObject } from '~/lib/head/article'
import { findBreadcrumb } from '~/lib/breadcrumb'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, $dayjs, error, params, route } = useContext()

    const res = useAsync(async () => {
      const slug = params.value.id

      const article = await $content()
        .where({ id: parseInt(slug) })
        .fetch()

      const surround = await $content()
        .only(['id', 'title'])
        .sortBy('id')
        .surround(slug)
        .fetch()

      return {
        article:
          Array.isArray(article) && article.length > 0 ? article[0] : null,
        surround: Array.isArray(surround)
          ? { prev: surround[0], next: surround[1] }
          : { prev: surround, next: null },
      }
    }, `useAsync_${params.value.id}`)

    watchEffect(() => {
      // console.info(res.value)
      if (res.value && !res.value.article) {
        error({ statusCode: 404, message: 'Not Found' })
      }
    })

    useMeta(() => {
      const refVal = res.value ? res.value.article : null
      const data = refVal || {
        title: '',
        date: '',
      }

      const title = data.title
      const description = `「${title}」についてまとめた記事です。`
      const path = route.value.path

      const breadcrumbSchema: IBreadcrumbSchema = {
        items: [
          findBreadcrumb('/'),
          {
            name: title,
            path: route.value.path,
          },
        ],
      }

      const articleSchema: IArticleSchema = {
        articleId: parseInt(params.value.id),
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
      res,
    }
  },
})
</script>
