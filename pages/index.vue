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
import { ContentArticle } from '~/interfaces/ContentArticle.ts'

export default Vue.extend({
  async asyncData({ $content }) {
    const activePage = 1

    const totalArticle = (await $content(
      'articles'
    ).fetch()) as ContentArticle[]
    const totalArticleCount = totalArticle.length

    const limitCount = parseInt(process.env.MAX_ARTICLE_COUNT_IN_LIST as string)

    const articles = (await $content('articles')
      .sortBy('id', 'desc')
      .limit(limitCount)
      .fetch()) as ContentArticle[]

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
    const title = 'トップページ'
    const description = `${process.env.SITE_OWNER}の技術ブログです。`

    const breadcrumbSchemaString = this.$createBreadcrumbSchema([
      {
        name: title,
        path: '/',
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
