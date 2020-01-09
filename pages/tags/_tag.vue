<template>
  <div>
    <div v-for="article in matchList" :key="article.id" class="article__wrapper">
      <div>{{ article.date }}</div>
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">{{ article.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import articleList from '~/assets/json/articleList.json'

export default {
  asyncData ({ params }) {
    const matchList = articleList.filter(v => v.tags.indexOf(params.tag) > -1)
    return {
      tag: params.tag,
      matchList: matchList.reverse()
    }
  },
  head () {
    return {
      title: this.tag
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  &__wrapper:nth-child(n+2) {
    margin-top: 30px;
  }
}
</style>
