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
import { ContentArticle } from '~/interfaces/ContentArticle.ts'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const activePage = parseInt(params.page)

    const totalArticle = (await $content(
      'articles'
    ).fetch()) as ContentArticle[]
    const totalArticleCount = totalArticle.length

    const maxArticleCountInList = parseInt(
      process.env.MAX_ARTICLE_COUNT_IN_LIST as string
    )

    const skipCount =
      activePage === 1 ? 0 : (activePage - 1) * maxArticleCountInList

    const limitCount = maxArticleCountInList

    const articles = (await $content('articles')
      .sortBy('id', 'desc')
      .skip(skipCount)
      .limit(limitCount)
      .fetch()) as ContentArticle[]

    // 記事データが存在しない場合はエラー
    if (articles.length === 0) {
      error({ statusCode: 404, message: 'Not Found' })
    }

    return {
      activePage,
      totalArticleCount,
      articles,
    }
  },
  data() {
    return {
      activePage: -1,
      totalArticleCount: -1,
      articles: [],
    }
  },
  head() {
    // 型推論が効かないので型を明示する
    const activePage = this.activePage as number

    const title = `記事一覧${activePage}`
    const description = `記事一覧の${activePage}ページ目です。`

    const breadcrumbSchemaString = this.$createBreadcrumbSchema([
      {
        name: 'トップページ',
        path: '/',
      },
      {
        name: title,
        path: `/articles/list/${activePage}`,
      },
    ])

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
