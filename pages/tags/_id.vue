<template>
  <div>
    <div v-for="article in matchList" :key="article.id" class="article__wrapper">
      <div>{{ article.date }}</div>
      <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">{{ article.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import { tagList } from '~/const/tagList'
import { articleList } from '~/const/articleList'

export default {
  asyncData ({ params }) {
    // キーを削除
    const tagValues = Object.values(tagList)

    let tag = null
    tagValues.map(v => {
      if (params.id == v.id) {
        tag = v
      }
    })
    
    let matchList = []
    articleList.map(article => {
      article.tags.map(v => {
        if (params.id == v.id) {
          matchList.push(article)
        }
      })
    })
    return {
      tag: tag,
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
