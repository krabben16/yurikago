<template>
  <div class="list">
    <div v-for="article in matchList" :key="article.id" class="article-wrapper">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import { tagList } from '~/const/tagList'
import { articleList } from '~/const/articleList'
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
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
      title: this.tag.name,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.tag.name, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
    }
  },
  mounted () {
    // パンくず
    this.$nuxt.$emit('setPageName', this.tag.name)
  }
}
</script>

<style lang="scss" scoped>
.article-wrapper {
  margin-top: 30px;
  
  a {
    text-decoration: none
  }
}
</style>
