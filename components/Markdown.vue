<template>
  <div class="markdown-wrapper" v-html="htmlContent"></div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  computed: {
    helpers () {
      return {
        // https://github.com/markedjs/marked/blob/master/lib/marked.js#L145-L171
        cleanUrl: (sanitize, base, href) => {
          if (sanitize) {
            let prot

            try {
              prot = decodeURIComponent(unescape(href)).replace(nonWordAndColonTest, '').toLowerCase()
            } catch (e) {
              return null
            }

            if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
              return null
            }
          }

          if (base && !originIndependentUrl.test(href)) {
            href = resolveUrl(base, href)
          }

          try {
            href = encodeURI(href).replace(/%25/g, '%')
          } catch (e) {
            return null
          }

          return href
        },
        // https://github.com/markedjs/marked/blob/master/lib/marked.js#L93-L105
        escape : (html, encode) => {
          const escapeTest = /[&<>"']/
          const escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/
          if (encode) {
            if (escapeTest.test(html)) {
              return html.replace(escapeReplace, getEscapeReplacement)
            }
          } else {
            if (escapeTestNoEncode.test(html)) {
              return html.replace(escapeReplaceNoEncode, getEscapeReplacement)
            }
          }

          return html
        }
      }
    },
    htmlContent () {
      const renderer = new marked.Renderer()
      
      // WebP画像を表示
      renderer.image = (href, title, text) => {
        href = this.helpers.cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)

        if (href === null) {
          return text
        }

        const out = `<picture><source srcset="${href}.webp" type="image/webp"><img src="${href}.png" alt="${text}"></picture>`

        return out
      }

      // 外部リンクを別タブで開く
      renderer.link = (href, title, text) => {
        href = this.helpers.cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)

        if (href === null) {
          return text
        }

        const escape = this.helpers.escape(href)
        let out

        if (escape.slice(0, 1) === '/') {
          out = `<a href="${escape}">${text}</a>`
        } else {
          out = `<a href="${escape}" target="_blank">${text}</a>`
        }

        return out
      }

      // テーブルにbootstrapのクラスを付与
      renderer.table = (header, body) => {
        if (body) body = '<tbody>' + body + '</tbody>'
        return `<div class="table-responsive"><table class="table"><thead>${header}</thead>${body}</table></div>`
      }

      // 中央寄せを解除
      renderer.tablecell = (content, flags) => {
        const type = flags.header ? 'th' : 'td'
        return `<${type}>${content}</${type}>`
      }

      return marked(this.markdownContent, { renderer: renderer })
    }
  },
  props: [
    'markdownContent'
  ],
  created () {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: (code, lang) => {
        return hljs.highlightAuto(code, [lang]).value
      }
    })
  }
}
</script>

<style lang="scss">
.markdown-wrapper {
  // 見出し
  h2, h3, h4, h5, h6 {
    margin: 30px 0;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(0,0,0,.25);
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

    color: grey;
    padding: 10px 20px;

    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;

    a {
      color: grey;
    }
  }
}
</style>
