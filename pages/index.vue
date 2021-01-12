<template>
  <div>
    <template v-if="$fetchState.pending || $fetchState.error">
      <Placeholder />
    </template>
    <template v-else>
      <div class="min-vh-100 px-3 px-sm-5 py-5 bg-white rounded">
        <ArticleList :articles="articles" />
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
import { ContentArticleListItem } from '~/interfaces/Content'
import { createHeadObject } from '~/lib/head/common'
import { ContentFunctions as cf } from '~/lib/content/article'

export default defineComponent({
  // You need to define an empty head to activate this functionality
  head: {},
  setup() {
    const { $content, route } = useContext()

    const articles = ref<ContentArticleListItem[]>()
    const meta = ref<CommonHead>()

    useFetch(async () => {
      async function fetchArticles() {
        return await cf.fetchAllArticles($content)
      }

      function fetchMeta(): CommonHead {
        const title = 'トップページ'
        const description = `${process.env.SITE_OWNER}の技術ブログです。`
        const path = route.value.path

        const breadcrumbSchema: BreadcrumbSchema = {
          items: [
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
      meta.value = fetchMeta()
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
