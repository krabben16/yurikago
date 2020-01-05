<template>
  <div v-html="htmlContent"></div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'

export default {
  created () {
    marked.setOptions({
      highlight: (code, lang) => {
        return hljs.highlightAuto(code, [lang]).value
      }
    })
  },
  props: [
    'markdownContent'
  ],
  computed: {
    htmlContent () {
      const helpers = {
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
        }
      }

      // デフォルトのメソッドをオーバーライドしてWebP画像を表示する
      const renderer = new marked.Renderer()
      renderer.image = (href, title, text) => {
        href = helpers.cleanUrl(renderer.options.sanitize, renderer.options.baseUrl, href)

        if (href === null) {
          return text
        }

        const out = `<picture>
  <source srcset="${href}.webp" type="image/webp">
  <img src="${href}.png" alt="${text}">
</picture>`

        return out
      }

      return marked(this.markdownContent, { renderer: renderer })
    }
  },
}
</script>

<style>
@import "highlight.js/styles/github-gist.css";

pre {
  border: solid thin;
  padding: 1rem;
}
</style>
