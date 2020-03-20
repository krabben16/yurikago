<template>
  <div class="markdown-wrapper" v-html="htmlContent" />
</template>

<script>
import mdit from "markdown-it"
import footnote from "markdown-it-footnote"
import hljs from "highlight.js"

export default {
  props: ["markdownContent"],
  data() {
    return {
      htmlContent: null
    }
  },
  mounted() {
    const md = new mdit({
      highlight: (str, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return '<pre class="hljs"><code>' + hljs.highlight(lang, str, true).value + "</code></pre>"
          } catch (__) {
            return "Error"
          }
        }
        return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
      }
    }).use(footnote)

    // 外部リンクを別タブで開く
    let defaultLinkOpen = null
    if (md.renderer.rules.link_open) {
      defaultLinkOpen = md.renderer.rules.link_open
    } else {
      defaultLinkOpen = (tokens, idx, options, env, self) => {
        return self.renderToken(tokens, idx, options)
      }
    }

    md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
      const hrefIndex = tokens[idx].attrIndex("href")
      const href = tokens[idx].attrs[hrefIndex][1]

      if (href.slice(0, 1) !== "/") {
        tokens[idx].attrPush(["target", "_blank"])
      }

      return defaultLinkOpen(tokens, idx, options, env, self)
    }

    // テーブルにbootstrapのクラスを付与
    md.renderer.rules.table_open = () => {
      return '<div class="table-responsive"><table class="table">'
    }

    md.renderer.rules.table_close = () => {
      return "</table></div>"
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
  h3 {
    background-color: #f8f9fa;
    padding: 10px 10px 10px 20px;
    border-left: 3px solid lightseagreen;
  }

  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 40px;
  }

  h3:nth-child(n + 2),
  h4:nth-child(n + 2),
  h5:nth-child(n + 2),
  h6:nth-child(n + 2) {
    margin-top: 40px;
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
