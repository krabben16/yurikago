<template>
  <div>
    <template v-if="!articles || !tag">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 bg-white rounded shadow-sm">
        <div class="row pt-5">
          <div class="col-12">
            <ArticleList :articles="articles" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  useAsync,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { createHeadObject } from '~/resources/head/common'
import { fetchArticlesByTagId, fetchTagById } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articles = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const articles = await fetchArticlesByTagId($content, tagId)

      if (articles.length === 0) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return articles
    })

    const tag = useAsync(async () => {
      const tagId = parseInt(params.value.id)
      const tag = await fetchTagById($content, tagId)

      if (!tag) {
        error({ statusCode: 404, message: 'Not Found' })
        return null
      }

      return tag
    })

    useMeta(() => {
      if (!tag.value) return {}

      const title = tag.value.name
      const description = `タグ「${tag.value.name}」を含む記事の一覧です。`
      const path = route.value.path

      const breadcrumbSchema = {
        breadcrumbItemList: [
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

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
      })
    })

    return {
      articles,
      tag,
    }
  },
})
</script>
