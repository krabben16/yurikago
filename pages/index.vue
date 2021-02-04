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
import { IBreadcrumbSchema } from '~/interfaces/schema'
import { createHeadObject } from '~/lib/head/common'
import { findBreadcrumb } from '~/lib/breadcrumb'

export default defineComponent({
  setup() {
    const { $content, route } = useContext()

    const articles = useAsync(async () => {
      const data = await $content()
        .only(['id', 'title', 'date', 'description'])
        .sortBy('id', 'desc')
        .fetch()
      return Array.isArray(data) ? data : [data]
    })

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema: IBreadcrumbSchema = {
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
  // You need to define an empty head to activate this functionality
  head: {},
})
</script>
