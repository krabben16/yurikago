<template>
  <div class="container min-vh-100 px-sm-5 py-5 bg-white rounded shadow-sm">
    <!-- パンくず -->
    <div v-if="meta" class="row">
      <div class="col-12">
        <Breadcrumb :items="meta.breadcrumbSchema.items" />
      </div>
    </div>
    <div v-if="articles" class="row pt-5">
      <div class="col-12">
        <ArticleList :articles="articles" />
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
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/resources/head/common'
import { fetchArticlesByTagId, fetchTagById } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articles = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const articles = await fetchArticlesByTagId($content, tagId)

      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return articles
    })

    const tag = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const tag = await fetchTagById($content, tagId)

      if (!tag) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return tag
    })

    const meta = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const tag = await fetchTagById($content, tagId)

      if (!tag) {
        return null
      }

      const title = `タグ(${tag.name})`
      const description = `タグ「${tag.name}」を含む記事の一覧です。`
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

      return {
        title,
        description,
        path,
        breadcrumbSchema,
      }
    })

    useMeta(() => {
      if (!meta.value) return {}

      return createHeadObject({
        title: meta.value.title,
        description: meta.value.description,
        path: meta.value.path,
        breadcrumbSchema: meta.value.breadcrumbSchema,
      })
    })

    return {
      meta,
      articles,
      tag,
    }
  },
})
</script>
