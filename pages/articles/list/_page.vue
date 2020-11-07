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
    // typeof context.params.page => string
    const activePage = parseInt(context.params.page)

    const totalArticle = await context.$content('articles').only(['id']).fetch()
    const totalArticleCount = totalArticle.length

    const skipCount =
      activePage === 1
        ? 0
        : (activePage - 1) *
          parseInt(process.env.MAX_ARTICLE_COUNT_IN_LIST as string)
    const limitCount = parseInt(process.env.MAX_ARTICLE_COUNT_IN_LIST as string)
    const articles = await context
      .$content('articles')
      .sortBy('id', 'desc')
      .skip(skipCount)
      .limit(limitCount)
      .fetch()

    // 記事データが存在しない場合はエラー
    if (articles.length === 0) {
      context.error({ statusCode: 404, message: 'Not Found' })
    }

    return {
      activePage,
      totalArticleCount,
      articles,
    }
  },
  data(): DataType {
    return {
      activePage: 0,
      totalArticleCount: 0,
      articles: [],
    }
  },
  head() {
    const titleValue: string = `記事一覧${this.activePage}`
    const descriptionValue: string = `記事一覧の${this.activePage}ページ目です。`
    const breadcrumbItemList: BreadcrumbItem[] = [
      {
        name: 'トップページ',
        path: '/',
      },
      {
        name: titleValue,
        path: `/articles/list/${this.activePage}`,
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
