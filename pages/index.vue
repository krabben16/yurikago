<template>
  <ArticleList v-if="articles" :articles="articles" />
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { createHeadObject } from '~/lib/head/common'
import { findBreadcrumb } from '~/lib/breadcrumb'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const articles = useAsync(async () => {
      const data = await $content('articles')
        .only(['id', 'title', 'date', 'tags', 'description'])
        .sortBy('id', 'desc')
        .fetch()
      return Array.isArray(data) ? data : [data]
    })

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema: BreadcrumbSchema = {
        items: [findBreadcrumb('/')],
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
