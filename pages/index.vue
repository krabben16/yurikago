<template>
  <div class="min-vh-100 px-3 px-sm-5 py-5 bg-white rounded">
    <ArticleList v-if="articles" :articles="articles" />
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
import { createHeadObject } from '~/lib/head/common'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const articles = useAsync(async () => {
      const data = await $content('articles')
        .only(['id', 'title', 'date', 'tags'])
        .sortBy('id', 'desc')
        .fetch()
      return Array.isArray(data) ? data : [data]
    })

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema: BreadcrumbSchema = {
        items: [
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
