<template>
  <div class="markdown__wrapper" v-html="htmlContent"></div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  created () {
    marked.setOptions({
      langPrefix: 'hljs ',
      highlight: (code, lang) => {
        return hljs.highlightAuto(code, [lang]).value
      }
    })
  },
  props: [
    'markdownContent'
  ],
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

          return html;
        }
      }
    },
    htmlContent () {
      const renderer = new marked.Renderer()
      
      // WebP画像を表示する
      renderer.image = (href, title, text) => {
        href = this.helpers.cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)

        if (href === null) {
          return text
        }

        const out = `<picture>
  <source srcset="${href}.webp" type="image/webp">
  <img src="${href}.png" alt="${text}">
</picture>`

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

      return marked(this.markdownContent, { renderer: renderer })
    }
  },
}
</script>

<style lang="scss" scoped>
.markdown {
  &__wrapper {
    /deep/ img {
      width: 100%;
    }

    /deep/ pre {
      white-space: pre-wrap;
    }

    /deep/ blockquote {
      color: grey;
    }

    // テーブル
    /deep/ th, /deep/ td {
      border: 1px dashed;
      padding: 15px 30px;
    }

    /deep/ table {
      border-collapse: collapse;
      margin: 0 auto;
    }
  }
}
</style>
