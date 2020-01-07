<template>
  <div>
    <div v-for="article in articles" :key="article.id" class="article__wrapper">
      <div>{{ article.date }}</div>
      <nuxt-link :to="{ name: 'articles-id', params: {id: article.id} }">{{ article.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import articleList from '~/assets/json/articleList.json'

export default {
  asyncData ({ params }) {
    return {
      articles: articleList.slice().reverse()
    }
  },
  head () {
    return {
      titleTemplate: 'Yurikago Blog'
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  &__wrapper:nth-child(n+2) {
    margin-top: 2em
  }
}
</style>
