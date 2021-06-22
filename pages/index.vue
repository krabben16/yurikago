<template>
  <ArticleList v-if="articles" :articles="articles" />
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  useContext,
  useMeta,
} from '@nuxtjs/composition-api'
import { IBreadcrumbSchema } from '~/interfaces/schema'
import { createHeadObject } from '~/lib/head/common'
import { findBreadcrumb } from '~/lib/breadcrumb'
import { ArticlesStoreKey, ArticlesStoreType } from '~/compositions/useArticles'
import ArticleList from '~/components/organisms/ArticleList.vue'

export default defineComponent({
  components: {
    ArticleList,
  },
  setup() {
    const { route } = useContext()

    const store = inject(ArticlesStoreKey) as ArticlesStoreType

    useMeta(() => {
      const title = 'トップページ'
      const description = `${process.env.SITE_OWNER}の技術ブログです。`
      const path = route.value.path

      const breadcrumbSchema: IBreadcrumbSchema = {
        items: [findBreadcrumb('/')],
      }

      return createHeadObject({
        title,
        description,
        path,
        breadcrumbSchema,
      })
    })

    return {
      articles: store.articles,
    }
  },
  // You need to define an empty head to activate this functionality
  head: {},
})
</script>
