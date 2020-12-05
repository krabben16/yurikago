<template>
  <div>
    <template v-if="!totalArticleCount || !articles">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 bg-white rounded shadow-sm">
        <div class="row pt-5">
          <div class="col-12">
            <ArticleList :articles="articles" />
          </div>
        </div>
        <div class="row pt-5 pb-5">
          <div class="col-12">
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
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
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

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema = {
        items: [
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
      activePage,
      totalArticleCount,
      articles,
    }
  },
})
</script>
