<template>
  <ArticleList v-if="articles" :articles="articles" />
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
  watchEffect,
} from '@nuxtjs/composition-api'
import { IBreadcrumbSchema } from '~/interfaces/schema'
import { createHeadObject } from '~/lib/head/common'
import { findBreadcrumb } from '~/lib/breadcrumb'
import { createArticleIds, createTag } from '~/lib/tags'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articles = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const articleIds = createArticleIds(tagId)

      const data = await $content()
        .only(['id', 'title', 'date', 'description'])
        .where({ id: { $in: articleIds } })
        .sortBy('id', 'desc')
        .fetch()

      return Array.isArray(data) ? data : [data]
    }, `useAsync_${params.value.id}`)

    watchEffect(() => {
      // console.info(articles.value)
      if (articles.value && articles.value.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
      }
    })

    useMeta(() => {
      const tagId = parseInt(params.value.id)
      const data = createTag(tagId)

      const title = `タグ(${data.name})`
      const description = `タグ「${data.name}」を含む記事の一覧です。`
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

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
      })
    })

    return {
      articles,
    }
  },
})
</script>
