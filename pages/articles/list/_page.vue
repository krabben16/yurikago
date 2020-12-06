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
  fetchArticlesByPage,
} from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const activePage = useAsync(() => parseInt(params.value.page))

    const totalArticleCount = useAsync(async () => {
      return await fetchTotalArticleCount($content)
    })

    const articles = useAsync(async () => {
      const activePage = parseInt(params.value.page)

      const maxArticleCountInList = parseInt(
        process.env.MAX_ARTICLE_COUNT_IN_LIST as string
      )

      const skipCount =
        activePage === 1 ? 0 : (activePage - 1) * maxArticleCountInList

      const limitCount = parseInt(
        process.env.MAX_ARTICLE_COUNT_IN_LIST as string
      )

      const articles = await fetchArticlesByPage(
        $content,
        skipCount,
        limitCount
      )

      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return articles
    })

    const meta = useAsync(() => {
      const activePage = parseInt(params.value.page)

      const title = `記事一覧(${activePage}ページ目)`
      const description = `記事一覧の${activePage}ページ目です。`
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
      activePage,
      totalArticleCount,
      articles,
    }
  },
})
</script>
