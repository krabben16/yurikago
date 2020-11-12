<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" :title="`タグ: ${state.tag.name}`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { contentFunc } from '@nuxt/content/types/content'
import { ContentArticle, ContentArticleTag } from '~/interfaces/Content'

async function fetchArticlesByTagId($content: contentFunc, tagId: number) {
  const articles = await $content('articles')
    .where({ 'tags.id': { $contains: tagId } })
    .sortBy('id', 'desc')
    .fetch()
  return articles as ContentArticle[]
}

/**
 * tagIdと一致するオブジェクトを取得する
 */
function searchTagObject(tagId: number, articleList: ContentArticle[]) {
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

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, app, error, params, route } = useContext()

    const defaultContentArticleTag = {
      id: -1,
      name: '',
    } as ContentArticleTag

    const articlesRef = ref<ContentArticle[]>([])

    const state = reactive({
      tag: defaultContentArticleTag,
    })

    useAsync(async () => {
      const tagId = parseInt(params.value.id)

      const articles = await fetchArticlesByTagId($content, tagId)

      // 記事データが存在しない場合はエラー
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
      }

      const tag = searchTagObject(tagId, articles)

      articlesRef.value = articles.length === 0 ? [] : articles
      state.tag = tag
    })

    useMeta(() => {
      const title = state.tag.name
      const description = `タグ「${state.tag.name}」を含む記事の一覧です。`
      const path = route.value.path

      const breadcrumbSchema = app.$createBreadcrumbSchema({
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: `/tags/${state.tag.id}`,
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
      articles: articlesRef,
      state,
    }
  },
})
</script>
