<template>
  <div>
    <div class="card-deck" v-for="(row, k) in splitArticlesArray" :key="k">
      <Article v-for="article in row" :key="article.id" :article="article" />
    </div>
  </div>
</template>

<script>
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
  computed: {
    splitArticlesArray () {
      const column_count = 3
      let table = []
      let row = []
      this.articles.map(v => {
        if (row.length === column_count) {
          table.push(row)
          row = []
        }
        row.push(v)
      })
      if (row.length > 0) {
        table.push(row)
      }
      return table
    }
  },
  props: [
    'articles'
  ]
}
</script>

<style lang="scss" scoped>
/* SP */
@media screen and (max-width: 575px) {

}

/* PC */
@media screen and (min-width: 576px) {
  .card-deck:nth-child(n+2) {
    margin-top: 40px;
  }
}
</style>
