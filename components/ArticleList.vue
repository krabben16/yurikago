<template>
  <div class="container">
    <div v-for="article in articles" :key="article.id" class="row">
      <div class="col-12 col-sm-10 mx-sm-auto">
        <Article :article="article" />
      </div>
    </div>
  </div>
</template>

<script>
import Article from "~/components/Article.vue"

export default {
  components: {
    Article
  },
  props: ["articles"]
}
</script>

<style lang="scss" scoped>
.row:nth-child(n + 2) {
  margin-top: 40px;
}
</style>
