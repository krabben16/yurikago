<template>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center">
      <li v-for="page in pages" :key="page" class="page-item" v-bind:class="{ disabled: activePage === page }">
        <!-- nuxt-linkを使うとページのasyncDataが実行されず、記事リストが更新されない -->
        <a class="page-link text-dark" v-bind:class="{ 'bg-light': activePage === page }" :href="'/?p=' + page">{{ page }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: [
    'activePage',
    'articleTotalCount'
  ],
  data() {
    return {
      pages: null
    }
  },
  mounted() {
    const pageArticleCount = 10
    const maxPageCount = Math.ceil(this.articleTotalCount / pageArticleCount)
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
