<template>
  <div>
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="container min-vh-100 px-sm-5 py-5 bg-white rounded shadow-sm">
        <!-- パンくず -->
        <div class="row">
          <div class="col-12">
            <Breadcrumb :items="meta.breadcrumbSchema.items" />
          </div>
        </div>
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
  ref,
  useContext,
  useFetch,
  useMeta,
} from '@nuxtjs/composition-api'
import { CommonHead } from '~/interfaces/Head'
import { BreadcrumbSchema } from '~/interfaces/Schema'
import { ContentArticle } from '~/interfaces/Content'
import { createHeadObject } from '~/resources/head/common'
import { ContentFunctions as cf } from '~/resources/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, error, params, route } = useContext()

    const articles = ref<ContentArticle[]>()
    const meta = ref<CommonHead>()

    useFetch(async () => {
      async function fetchArticles() {
        const tagId = parseInt(params.value.id)
        const articles = await cf.fetchArticlesByTagId($content, tagId)

        if (articles.length === 0) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        return articles
      }

      async function fetchMeta(): Promise<CommonHead> {
        const tagId = parseInt(params.value.id)
        const tag = await cf.fetchTagById($content, tagId)

        if (!tag) {
          error({ statusCode: 404, message: 'Not Found' })
          throw new Error('Not Found')
        }

        const title = `タグ(${tag.name})`
        const description = `タグ「${tag.name}」を含む記事の一覧です。`
        const path = route.value.path

        const breadcrumbSchema: BreadcrumbSchema = {
          items: [
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

        return {
          title,
          description,
          path,
          breadcrumbSchema,
        }
      }

      articles.value = await fetchArticles()
      meta.value = await fetchMeta()
    })

    useMeta(() => {
      if (!meta.value) return {}
      return createHeadObject(meta.value)
    })

    return {
      articles,
      meta,
    }
  },
})
</script>
