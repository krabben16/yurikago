<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" title="直近の記事" />
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

async function fetchRecentlyArticles(
  $content: contentFunc,
  limitCount: number
) {
  const articles = await $content('articles')
    .sortBy('id', 'desc')
    .limit(limitCount)
    .fetch()
  return articles as ContentArticle[]
}

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, app, route } = useContext()

    const activePageRef = ref(-1)
    const totalArticleCountRef = ref(-1)
    const articlesRef = ref<ContentArticle[]>([])

    useAsync(async () => {
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

      const breadcrumbSchema = app.$createBreadcrumbSchema({
        breadcrumbItemList: [
          {
            name: title,
            path: '/',
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
