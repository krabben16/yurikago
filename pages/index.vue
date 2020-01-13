<template>
  <div class="list">
    <div v-for="article in articles" :key="article.id" class="article-wrapper">
      <Article :article="article" />
    </div>
  </div>
</template>

<script>
import { articleList } from '~/const/articleList'
import Article from '~/components/Article.vue'

export default {
  components: {
    Article
  },
  asyncData ({ params }) {
    return {
      articles: articleList.slice().reverse()
    }
  },
  data () {
    return {
      title: 'Yurikago Blog'
    }
  },
  head () {
    return {
      titleTemplate: this.title,
      // 構造化マークアップ
      script: [{
        hid: 'breadcrumbSchema',
        innerHTML: this.$getBreadcrumbSchema(this.title, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ['innerHTML']
      }
    }
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
