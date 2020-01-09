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
    const getTag = (tags, id) => {
      let tag = null
      tags.forEach(v => {
        if (v.id == id) {
          tag = v
        }
      })
      return tag
    }
    const matchList = articleList.filter(article => {
      return getTag(article.tags, params.id)
    })
    return {
      tag: getTag(matchList[0].tags, params.id),
      matchList: matchList.reverse()
    }
  },
  head () {
    return {
      title: this.tag.name
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.tag.name)
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
