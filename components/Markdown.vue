<template>
  <div class="markdown-wrapper" v-html="htmlContent"></div>
</template>

<script>
import mdit from 'markdown-it'
import footnote from 'markdown-it-footnote'
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
    }).use(footnote)

  　// 外部リンクを別タブで開く
    const defaultLinkOpen = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
      return self.renderToken(tokens, idx, options)
    }

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const hrefIndex = tokens[idx].attrIndex('href')
      const href = tokens[idx].attrs[hrefIndex][1]

      if (href.slice(0, 1) !== '/') {
        tokens[idx].attrPush(['target', '_blank'])
      }

      return defaultLinkOpen(tokens, idx, options, env, self)
    }

    // テーブルにbootstrapのクラスを付与
    md.renderer.rules.table_open = () => {
      return '<div class="table-responsive"><table class="table">'
    }
    
    md.renderer.rules.table_close = () => {
      return '</table></div>'
    }

    // 脚注 デフォルトのhrタグを削除する
    md.renderer.rules.footnote_block_open = () => {
      return '<section class="footnotes"><ol class="footnotes-list">'
    }

    this.htmlContent = md.render(this.markdownContent)
  }
}
</script>

<style lang="scss">
.markdown-wrapper {
  h2, h3 {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }

  h2, h3, h4, h5, h6 {
    margin-bottom: 30px;
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

  .footnotes {
    margin-top: 60px;
  }

  // デフォルトのボーダーを削除
  .table {
    thead {
      th {
        border-bottom: none;
      }
    }
  }
}
</style>
