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
import Vue from 'vue'
import { BreadcrumbItem } from '~/interfaces/BreadcrumbItem'
import ArticleList from '~/components/ArticleList.vue'
import Pagenation from '~/components/Pagenation.vue'

interface DataType {
  activePage: number
  totalArticleCount: number
  articles: any
}

export default Vue.extend({
  components: {
    ArticleList,
    Pagenation,
  },
  async asyncData(context): Promise<DataType> {
    const activePage = 1

    const totalArticle = await context.$content('articles').only(['id']).fetch()
    const totalArticleCount = totalArticle.length

    const limitCount: number = parseInt(
      process.env.MAX_ARTICLE_COUNT_IN_LIST as string
    )
    const articles = await context
      .$content('articles')
      .sortBy('id', 'desc')
      .limit(limitCount)
      .fetch()

    return {
      activePage,
      totalArticleCount,
      articles,
    }
  },
  head() {
    const titleValue: string = 'トップページ'
    const descriptionValue: string = `${process.env.SITE_OWNER}の技術ブログです。`
    const breadcrumbItemList: BreadcrumbItem[] = [
      {
        name: titleValue,
        path: '/',
      },
    ]

    const breadcrumbSchemaString: string = this.$createBreadcrumbSchema(
      breadcrumbItemList
    )

    return {
      title: titleValue,
      meta: [
        {
          name: 'description',
          content: descriptionValue,
        },
        {
          property: 'og:title',
          content: `${titleValue} | Yurikago Blog`,
        },
        {
          property: 'og:type',
          content: 'blog',
        },
        {
          property: 'og:description',
          content: descriptionValue,
        },
        {
          property: 'og:url',
          content: process.env.FRONT_URL + this.$route.path,
        },
      ],
      script: [
        // 構造化マークアップ
        {
          hid: 'breadcrumbSchema',
          innerHTML: breadcrumbSchemaString,
          type: 'application/ld+json',
        },
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML'],
      },
    }
  },
})
</script>
