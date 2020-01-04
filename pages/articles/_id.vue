<template>
  <div>
    <div>
      <div>{{ getDate }}</div>
      <h2>{{ getTitle }}</h2>
    </div>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js';

import article1 from '~/assets/markdown/articles/1.md'
import article2 from '~/assets/markdown/articles/2.md'
import article3 from '~/assets/markdown/articles/3.md'
import article4 from '~/assets/markdown/articles/4.md'
import article5 from '~/assets/markdown/articles/5.md'
import article6 from '~/assets/markdown/articles/6.md'
import article7 from '~/assets/markdown/articles/7.md'
import article8 from '~/assets/markdown/articles/8.md'

import articleList from '~/assets/json/articleList.json'

export default {
  created () {
    marked.setOptions({
      highlight: function(code, lang) {
        return hljs.highlightAuto(code, [lang]).value
      }
    });
  },
  computed: {
    getDate() {
      return this.article.date
    },
    getTitle () {
      return this.article.title
    },
    compiledMarkdown () {
      return marked(this.article.content)
    }
  },
  asyncData ({ params }) {
    articleList[0].content = article1
    articleList[1].content = article2
    articleList[2].content = article3
    articleList[3].content = article4
    articleList[4].content = article5
    articleList[5].content = article6
    articleList[6].content = article7
    articleList[7].content = article8
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

<style>
@import "highlight.js/styles/github-gist.css";

pre {
  border: solid thin;
  padding: 1rem;
}
</style>
