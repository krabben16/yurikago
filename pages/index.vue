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
    <div v-if="activePage && totalArticleCount" class="row pt-5">
      <div class="col-12">
        <Pagenation
          :active-page="activePage"
          :total-article-count="totalArticleCount"
        />
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
import {
  fetchTotalArticleCount,
  fetchRecentlyArticles,
} from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const activePage = 1

    const totalArticleCount = useAsync(async () => {
      return await fetchTotalArticleCount($content)
    })

    const articles = useAsync(async () => {
      const limitCount = parseInt(
        process.env.MAX_ARTICLE_COUNT_IN_LIST as string
      )

      return await fetchRecentlyArticles($content, limitCount)
    })

    const breadcrumbItems = useAsync(() => {
      return [
        {
          name: 'トップページ',
          path: route.value.path,
        },
      ]
    })

    const meta = useAsync(() => {
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
      activePage,
      totalArticleCount,
      articles,
      breadcrumbItems,
    }
  },
})
</script>
