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
        <div v-if="articles" class="row pt-5">
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
  computed,
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
    const { $content, error, params, route } = useContext()

    const activePage = computed(() => parseInt(params.value.page))
    const totalArticleCount = ref<number | null>(null)
    const articles = ref<ContentArticle[] | null>(null)
    const meta = ref<CommonHead | null>(null)

    useFetch(async () => {
      async function fetchTotalArticleCount() {
        return await ContentFunctions.fetchTotalArticleCount($content)
      }

      async function fetchArticles() {
        const activePage = parseInt(params.value.page)

        const maxArticleCountInList = parseInt(
          process.env.MAX_ARTICLE_COUNT_IN_LIST as string
        )

        const skipCount =
          activePage === 1 ? 0 : (activePage - 1) * maxArticleCountInList

        const limitCount = parseInt(
          process.env.MAX_ARTICLE_COUNT_IN_LIST as string
        )

        const articles = await ContentFunctions.fetchArticlesByPage(
          $content,
          skipCount,
          limitCount
        )

        if (articles.length === 0) {
          error({ statusCode: 404, message: 'Not Found' })
          return null
        }

        return articles
      }

      function fetchMeta(): CommonHead {
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
