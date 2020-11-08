<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" :title="`タグ: ${tag.name}`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  ContentArticle,
  ContentArticleTag,
} from '~/interfaces/ContentArticle.ts'

export default Vue.extend({
  async asyncData({ $content, params, error }) {
    const tagId = parseInt(params.id)

    const articles = (await $content('articles')
      .where({ 'tags.id': { $contains: tagId } })
      .sortBy('id', 'desc')
      .fetch()) as ContentArticle[]

    // 記事データが存在しない場合はエラー
    if (articles.length === 0) {
      error({ statusCode: 404, message: 'Not Found' })
    }

    /**
     * tagIdと一致するオブジェクトを取得する
     */
    function getTagObject(tagId: number, articleList: ContentArticle[]) {
      for (let i = 0; i < articleList.length; i++) {
        const article = articleList[i]
        for (let j = 0; j < article.tags.length; j++) {
          const tag = article.tags[j]
          if (tag.id === tagId) {
            return tag
          }
        }
      }
      return {
        id: -1,
        name: '',
      }
    }

    const tag = getTagObject(tagId, articles)

    return {
      articles,
      tag,
    }
  },
  data() {
    return {
      articles: [],
      tag: {
        id: -1,
        name: '',
      },
    }
  },
  head() {
    // 型推論が効かないので型を明示する
    const tag = this.tag as ContentArticleTag

    const title = tag.name
    const description = `タグ「${tag.name}」を含む記事の一覧です。`

    const breadcrumbSchemaString = this.$createBreadcrumbSchema([
      {
        name: 'トップページ',
        path: '/',
      },
      {
        name: title,
        path: `/tags/${tag.id}`,
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
