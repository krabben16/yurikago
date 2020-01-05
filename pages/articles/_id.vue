<template>
  <div>
    <div>
      <div>{{ articleDate }}</div>
      <h2>{{ articleTitle }}</h2>
    </div>
    <Markdown :markdownContent="articleContent"></Markdown>
  </div>
</template>

<script>
import Markdown from '~/components/Markdown.vue'

import content1 from '~/assets/markdown/articles/1.md'
import content2 from '~/assets/markdown/articles/2.md'
import content3 from '~/assets/markdown/articles/3.md'
import content4 from '~/assets/markdown/articles/4.md'
import content5 from '~/assets/markdown/articles/5.md'
import content6 from '~/assets/markdown/articles/6.md'
import content7 from '~/assets/markdown/articles/7.md'
import content8 from '~/assets/markdown/articles/8.md'
import content9 from '~/assets/markdown/articles/9.md'

import articleList from '~/assets/json/articleList.json'

export default {
  components: {
    Markdown
  },
  computed: {
    articleDate () {
      return this.article.date
    },
    articleTitle () {
      return this.article.title
    },
    articleContent () {
      return this.article.content
    }
  },
  asyncData ({ params }) {
    articleList.map(v => {
      switch (v.id) {
        case 1:
          v.content = content1
          break
        case 2:
          v.content = content2
          break
        case 3:
          v.content = content3
          break
        case 4:
          v.content = content4
          break
        case 5:
          v.content = content5
          break
        case 6:
          v.content = content6
          break
        case 7:
          v.content = content7
          break
        case 8:
          v.content = content8
          break
        case 9:
          v.content = content9
          break
        default:
          break
      }
    })
    return {
      article: articleList.filter(v => v.id == params.id).shift()
    }
  },
  head () {
    return {
      title: this.article.title
    }
  }
}
</script>
