<template>
  <div class="clearfix mt-5">
    <a v-if="isVisiblePrev" class="btn btn-light float-left" :href="prevPagePath">&larr; Prev</a>
    <a v-if="isVisibleNext" class="btn btn-light float-right" :href="nextPagePath">Next &rarr;</a>
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
  created() {
    // 2ページ目以降が存在する場合はNextを表示する
    const maxPageCount = Math.ceil(this.totalArticleCount / process.env.MAX_ARTICLE_COUNT_IN_LIST)
    this.isVisibleNext = this.activePage < maxPageCount
    this.nextPagePath = "/articles/list/" + (this.activePage + 1)

    // 2ページ目以降を表示中の場合はPrevを表示する
    this.isVisiblePrev = this.activePage > 1
    this.prevPagePath = "/articles/list/" + (this.activePage - 1)
  }
}
</script>
