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
import Vue from 'vue'

export default Vue.extend({
  props: {
    activePage: {
      type: Number,
      required: true,
    },
    totalArticleCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    // 2ページ目以降を表示中の場合はNextを表示する
    const existsNextPage: boolean = this.activePage > 1
    const nextPage: number = this.activePage - 1

    // 2ページ目以降が存在する場合はPrevを表示する
    const maxArticleCountInList: number = parseInt(
      process.env.MAX_ARTICLE_COUNT_IN_LIST as string
    )
    const maxPageCount: number = Math.ceil(
      this.totalArticleCount / maxArticleCountInList
    )
    const existsPrevPage: boolean = this.activePage < maxPageCount
    const prevPage: number = this.activePage + 1

    return {
      existsNextPage,
      nextPage,
      existsPrevPage,
      prevPage,
    }
  },
})
</script>
