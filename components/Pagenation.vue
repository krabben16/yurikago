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

<script>
export default {
  props: {
    activePage: {
      type: Number,
      required: true
    },
    totalArticleCount: {
      type: Number,
      required: true
    }
  },
  created () {
    // 2ページ目以降を表示中の場合はNextを表示する
    this.existsNextPage = this.activePage > 1
    this.nextPage = this.activePage - 1

    // 2ページ目以降が存在する場合はPrevを表示する
    const maxPageCount = Math.ceil(this.totalArticleCount / process.env.MAX_ARTICLE_COUNT_IN_LIST)
    this.existsPrevPage = this.activePage < maxPageCount
    this.prevPage = this.activePage + 1
  }
}
</script>
