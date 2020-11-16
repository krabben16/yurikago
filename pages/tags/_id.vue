<template>
  <div class="container-fluid bg-white min-vh-100">
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="row py-5">
        <div class="col-12 col-sm-5 mx-sm-auto">
          <ArticleList :articles="articles" :title="`タグ: ${tag.name}`" />
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
import { ContentArticle, ContentArticleTag } from '~/interfaces/Content'
import { createHeadObject } from '~/resources/head/common'
import { fetchArticlesByTagId } from '~/resources/content/article'

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
    const { $content, error, params, route } = useContext()

    const articlesRef = ref<ContentArticle[]>()
    const tagRef = ref<ContentArticleTag>()

    useFetch(async () => {
      const tagId = parseInt(params.value.id)

      const articles = await fetchArticlesByTagId($content, tagId)

      // 記事データが存在しない場合はエラー
      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        // $fetchState.error
        throw new Error('Not Found')
      }

      const tag = searchTagObject(tagId, articles)

      articlesRef.value = articles
      tagRef.value = tag
    })

    useMeta(() => {
      if (!tagRef.value) return {}

      const title = tagRef.value.name
      const description = `タグ「${tagRef.value.name}」を含む記事の一覧です。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
          {
            name: 'トップページ',
            path: '/',
          },
          {
            name: title,
            path: `/tags/${tagRef.value.id}`,
          },
        ],
      }

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
      })
    })

    return {
      articles: articlesRef,
      tag: tagRef,
    }
  },
})
</script>
