<template>
  <div>
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 py-5 bg-white rounded shadow-sm">
        <!-- パンくず -->
        <div class="row">
          <div class="col-12">
            <Breadcrumb :items="meta.breadcrumbSchema.items" />
          </div>
        </div>
        <div class="row pt-5">
          <div class="col-12">
            <ArticleList :articles="articles" />
          </div>
        </div>
        <div class="row pt-5">
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
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { CommonHead } from '~/interfaces/Head'
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { ContentArticle } from '~/interfaces/Content'
import { createHeadObject } from '~/resources/head/common'
import { ContentFunctions } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const activePage = 1
    const totalArticleCount = ref<number>()
    const articles = ref<ContentArticle[]>()
    const meta = ref<CommonHead>()

    useFetch(async () => {
      async function fetchTotalArticleCount() {
        return await ContentFunctions.fetchTotalArticleCount($content)
      }

      async function fetchArticles() {
        const limitCount = parseInt(
          process.env.MAX_ARTICLE_COUNT_IN_LIST as string
        )

        return await ContentFunctions.fetchRecentlyArticles(
          $content,
          limitCount
        )
      }

      function fetchMeta(): CommonHead {
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
      }

      totalArticleCount.value = await fetchTotalArticleCount()
      articles.value = await fetchArticles()
      meta.value = fetchMeta()
    })

    useMeta(() => {
      if (!meta.value) return {}
      return createHeadObject(meta.value)
    })

    return {
      activePage,
      totalArticleCount,
      articles,
      meta,
    }
  },
})
</script>
