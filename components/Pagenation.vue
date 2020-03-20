<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-for="p in pages" :key="p" class="page-item" v-bind:class="{ disabled: activePage === p }">
        <nuxt-link class="page-link text-dark" v-bind:class="{ 'bg-light': activePage === p }" :to="{ name: 'articles-list-page', params: { page: p } }">{{ p }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: [
    'activePage',
    'totalArticleCount'
  ],
  data() {
    return {
      pages: null
    }
  },
  mounted() {
    const maxArticleCount = 10
    const maxPageCount = Math.ceil(this.totalArticleCount / maxArticleCount)
    this.pages = Array.from(Array(maxPageCount).keys()).map(p => p + 1)
  }
}
</script>

<style lang="scss" scope>
.pagination {
  // デフォルトのマージンをリセット
  margin-bottom: 0;

  margin-top: 40px;
}
</style>
