<template>
  <div class="container-fluid bg-white min-vh-100">
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="row py-5">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <ArticleList :articles="articles" :title="`${activePage}ページ目`" />
          <div class="mt-4">
            <Pagenation
              :active-page="activePage"
              :total-article-count="totalArticleCount"
            />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { ContentArticle } from '~/interfaces/Content'
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

    const activePageRef = ref()
    const totalArticleCountRef = ref()
    const articlesRef = ref<ContentArticle[]>()

    useFetch(async () => {
      const activePage = parseInt(params.value.page)

      const totalArticleCount = await fetchTotalArticleCount($content)

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

      // 記事データが存在しない場合はエラー
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        // $fetchState.error
        throw new Error('Not Found')
      }

      activePageRef.value = activePage
      totalArticleCountRef.value = totalArticleCount
      articlesRef.value = articles
    })

    useMeta(() => {
      if (!activePageRef.value) return {}

      const title = `記事一覧${activePageRef.value}`
      const description = `記事一覧の${activePageRef.value}ページ目です。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: `/articles/list/${activePageRef.value}`,
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
      activePage: activePageRef,
      totalArticleCount: totalArticleCountRef,
      articles: articlesRef,
    }
  },
})
</script>
