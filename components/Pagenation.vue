<template>
  <nav aria-label="Page navigation">
    <!-- NOTE: デフォルトのマージンをリセット -->
    <ul class="pagination justify-content-center mt-5 mb-0">
      <li v-for="p in pages" :key="p" class="page-item" :class="{ disabled: activePage === p }">
        <nuxt-link
          class="page-link text-dark"
          :class="{ 'bg-light': activePage === p }"
          :to="{ name: 'articles-list-page', params: { page: p } }"
        >
          {{ p }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    activePage: Number,
    totalArticleCount: Number
  },
  data() {
    return {
      pages: null
    }
  },
  mounted() {
    const maxPageCount = Math.ceil(this.totalArticleCount / process.env.MAX_ARTICLE_COUNT_IN_LIST)
    this.pages = Array.from(Array(maxPageCount).keys()).map(p => p + 1)
  }
}
</script>
