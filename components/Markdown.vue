<template>
  <div class="p-markdown" v-html="htmlContent" />
</template>

<script>
import marked from "marked"
import hljs from "highlight.js"

export default {
  props: {
    markdownContent: String
  },
  data() {
    return {
      htmlContent: null
    }
  },
  mounted() {
    const renderer = new marked.Renderer()

    // WebP画像を表示
    renderer.image = (href, title, text) => {
      const webp = href.replace("png", "webp")
      return `<picture><source srcset="${webp}" type="image/webp"><img src="${href}" alt="${text}"></picture>`
    }

    // 外部リンクを別タブで開く
    // スタイルを適用するためクラスを付与する
    renderer.link = (href, title, text) => {
      let out = null
      if (href.slice(0, 1) === "/") {
        out = `<a href="${href}" class="u-link-color">${text}</a>`
      } else {
        out = `<a href="${href}" target="_blank" class="u-link-color">${text}</a>`
      }
      return out
    }

    // テーブルにbootstrapのクラスを付与
    renderer.table = (header, body) => {
      if (body) {
        body = "<tbody>" + body + "</tbody>"
      }
      return `<div class="table-responsive"><table class="table"><thead>${header}</thead>${body}</table></div>`
    }

    // 中央寄せを解除
    renderer.tablecell = (content, flags) => {
      const type = flags.header ? "th" : "td"
      return `<${type}>${content}</${type}>`
    }

    marked.setOptions({
      renderer: renderer,
      langPrefix: "hljs language-",
      highlight: (code, language) => {
        const validLanguage = hljs.getLanguage(language) ? language : "plaintext"
        return hljs.highlight(validLanguage, code).value
      }
    })

    this.htmlContent = marked(this.markdownContent)
  }
}
</script>
