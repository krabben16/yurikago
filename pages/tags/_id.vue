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
import { IContentDocument } from '@nuxt/content/types/content'
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/lib/head/common'
import { ContentArticleTag } from '~/interfaces/Content'
import { findBreadcrumb } from '~/lib/breadcrumb'

function searchTag(articles: IContentDocument[], tagId: number) {
  let tag: ContentArticleTag | null = null
  for (const article of articles) {
    for (const target of article.tags) {
      if (target.id === tagId) {
        tag = target
      }
    }
  }
  return tag
}

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articles = useAsync(async () => {
      const tagId = parseInt(params.value.id)

      const data = await $content('articles')
        .only(['id', 'title', 'date', 'tags'])
        .where({ 'tags.id': { $contains: tagId } })
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
      const refVal = articles.value || []
      const data = searchTag(refVal, tagId) || {
        name: '',
      }

      const title = `タグ(${data.name})`
      const description = `タグ「${data.name}」を含む記事の一覧です。`
      const path = route.value.path

      const breadcrumbSchema: BreadcrumbSchema = {
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
