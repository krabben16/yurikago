<template>
  <div class="container-fluid bg-white min-vh-100">
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="row py-5">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <ArticleList :articles="articles" title="直近の記事" />
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
  fetchRecentlyArticles,
} from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const activePageRef = ref()
    const totalArticleCountRef = ref()
    const articlesRef = ref<ContentArticle[]>()

    useFetch(async () => {
      const activePage = 1

      const totalArticleCount = await fetchTotalArticleCount($content)

      const limitCount = parseInt(
        process.env.MAX_ARTICLE_COUNT_IN_LIST as string
      )

      const articles = await fetchRecentlyArticles($content, limitCount)

      activePageRef.value = activePage
      totalArticleCountRef.value = totalArticleCount
      articlesRef.value = articles
    })

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
          {
            name: title,
            path: '/',
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
