<template>
  <div>
    <nuxt-link
      v-if="existsNextPage"
      class="btn btn-dark float-left"
      :to="{ name: 'articles-list-page', params: { page: nextPage } }"
      role="button"
    >
      &larr; Next
    </nuxt-link>
    <nuxt-link
      v-if="existsPrevPage"
      class="btn btn-dark float-right"
      :to="{ name: 'articles-list-page', params: { page: prevPage } }"
      role="button"
    >
      Prev &rarr;
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    activePage: {
      type: Number as () => number,
      required: true,
    },
    totalArticleCount: {
      type: Number as () => number,
      required: true,
    },
  },
  setup(props) {
    // 2ページ目以降を表示中の場合はNextを表示する
    const existsNextPage = computed(() => props.activePage > 1)
    const nextPage = computed(() => props.activePage - 1)

    // 2ページ目以降が存在する場合はPrevを表示する
    const maxArticleCountInList = parseInt(
      process.env.MAX_ARTICLE_COUNT_IN_LIST as string
    )
    const maxPageCount = computed(() =>
      Math.ceil(props.totalArticleCount / maxArticleCountInList)
    )
    const existsPrevPage = computed(() => props.activePage < maxPageCount.value)
    const prevPage = computed(() => props.activePage + 1)

    return {
      existsNextPage,
      nextPage,
      existsPrevPage,
      prevPage,
    }
  },
})
</script>
