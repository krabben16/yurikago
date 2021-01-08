<template>
  <div class="d-flex justify-content-between align-items-center">
    <div>
      <nuxt-link
        v-if="existsNextPage"
        class="btn btn-outline-dark"
        :to="{ name: 'articles-list-page', params: { page: nextPage } }"
        role="button"
      >
        &larr; Next
      </nuxt-link>
    </div>
    <div>{{ activePage }} / {{ maxPageCount }}</div>
    <div>
      <nuxt-link
        v-if="existsPrevPage"
        class="btn btn-outline-dark"
        :to="{ name: 'articles-list-page', params: { page: prevPage } }"
        role="button"
      >
        Prev &rarr;
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useContext,
  useFetch,
} from '@nuxtjs/composition-api'
import { ContentFunctions as cf } from '~/resources/content/article'

export default defineComponent({
  props: {
    activePage: {
      type: Number as () => number,
      required: true,
    },
  },
  setup(props) {
    const { $content } = useContext()

    const maxPageCountRef = ref<number>()
    const existsNextPageRef = ref<boolean>()
    const nextPageRef = ref<number | null>()
    const existsPrevPageRef = ref<boolean>()
    const prevPageRef = ref<number | null>()

    useFetch(async () => {
      const totalArticleCount = await cf.fetchTotalArticleCount($content)

      // 最大ページ数
      const maxArticleCountInList = parseInt(
        process.env.MAX_ARTICLE_COUNT_IN_LIST as string
      )
      const maxPageCount = Math.ceil(totalArticleCount / maxArticleCountInList)

      // 2ページ目以降を表示中の場合はNextを表示する
      const existsNextPage = props.activePage > 1
      const nextPage = existsNextPage ? props.activePage - 1 : null

      // 2ページ目以降が存在する場合はPrevを表示する
      const existsPrevPage = props.activePage < maxPageCount
      const prevPage = existsPrevPage ? props.activePage + 1 : null

      maxPageCountRef.value = maxPageCount
      existsNextPageRef.value = existsNextPage
      nextPageRef.value = nextPage
      existsPrevPageRef.value = existsPrevPage
      prevPageRef.value = prevPage
    })

    return {
      maxPageCount: maxPageCountRef,
      existsNextPage: existsNextPageRef,
      nextPage: nextPageRef,
      existsPrevPage: existsPrevPageRef,
      prevPage: prevPageRef,
    }
  },
})
</script>
