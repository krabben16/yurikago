<template>
  <div>
    <div v-for="article in articles" :key="article.id">
      {{ article.date }}
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
      title: "Top"
    }
  }
}
</script>
