<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" :title="`${activePage}ページ目`" />
        <div class="mt-4">
          <Pagenation
            :active-page="activePage"
            :total-article-count="totalArticleCount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle } from '~/interfaces/Content'

async function fetchTotalArticleCount($content: contentFunc) {
  const articleIds = await $content('articles').only(['id']).fetch()
  return (articleIds as ContentArticle[]).length
}

async function fetchArticlesByPage(
  $content: contentFunc,
  skipCount: number,
  limitCount: number
) {
  const articles = await $content('articles')
    .sortBy('id', 'desc')
    .skip(skipCount)
    .limit(limitCount)
    .fetch()
  return articles as ContentArticle[]
}

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, app, error, params, route } = useContext()

    const activePageRef = ref(-1)
    const totalArticleCountRef = ref(-1)
    const articlesRef = ref<ContentArticle[]>([])

    useAsync(async () => {
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
      }

      activePageRef.value = activePage
      totalArticleCountRef.value = totalArticleCount
      articlesRef.value = articles.length === 0 ? [] : articles
    })

    useMeta(() => {
      const title = `記事一覧${activePageRef.value}`
      const description = `記事一覧の${activePageRef.value}ページ目です。`
      const path = route.value.path

      const breadcrumbSchema = app.$createBreadcrumbSchema({
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
      })

      return {
        title,
        meta: [
          {
            name: 'description',
            content: description,
          },
          {
            property: 'og:title',
            content: `${title} | Yurikago Blog`,
          },
          {
            property: 'og:type',
            content: 'blog',
          },
          {
            property: 'og:description',
            content: description,
          },
          {
            property: 'og:url',
            content: (process.env.FRONT_URL as string) + path,
          },
        ],
        script: [
          // 構造化マークアップ
          {
            hid: 'breadcrumbSchema',
            innerHTML: breadcrumbSchema,
            type: 'application/ld+json',
          },
        ],
        __dangerouslyDisableSanitizersByTagID: {
          breadcrumbSchema: ['innerHTML'],
        },
      }
    })

    return {
      activePage: activePageRef,
      totalArticleCount: totalArticleCountRef,
      articles: articlesRef,
    }
  },
})
</script>
