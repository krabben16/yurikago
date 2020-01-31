<template>
  <div class="markdown-wrapper" v-html="htmlContent"></div>
</template>

<script>
import mdit from 'markdown-it'
import hljs from 'highlight.js'

export default {
  data() {
    return {
      htmlContent: null
    }
  },
  props: [
    'markdownContent'
  ],
  mounted() {
    const md = new mdit({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + '</code></pre>'
          } catch (__) {}
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
      }
    })
    this.htmlContent = md.render(this.markdownContent)
  }
}
</script>

<style lang="scss">
.markdown-wrapper {
  h2, h3, h4, h5, h6 {
    margin-bottom: 30px;
  }

  h2, h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  h2:nth-child(n+2),
  h3:nth-child(n+2),
  h4:nth-child(n+2),
  h5:nth-child(n+2),
  h6:nth-child(n+2) {
    margin-top: 30px;
  }

  li {
    margin: 10px 0;
  }

  img {
    max-width: 100%;
  }

  pre {
    white-space: pre-wrap;
  }

  blockquote {
    p {
      // デフォルトのマージンをリセット
      margin-bottom: 0;
    }

    color: gray;
    padding: 10px 20px;

    a {
      color: gray;
    }
  }
}
</style>
