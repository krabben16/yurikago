<template>
  <div class="p-markdown" v-html="htmlContent" />
</template>

<script>
import marked from "marked"
import hljs from "highlight.js"

export default {
  props: {
    markdownContent: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      htmlContent: null
    }
  },
  mounted() {
    /**
     * NOTE: markedのレンダラーを上書きする
     * @see https://github.com/markedjs/marked/blob/master/src/Renderer.js
     */
    const renderer = new marked.Renderer()

    // 見出しに下線とマージンを設定する
    renderer.heading = (text, level, raw, slugger) => {
      if (level === 3) {
        return `<h3 class="pb-3 my-5">${text}</h3>`
      }
      return `<h${level} class="my-5">${text}</h${level}>`
    }

    // 水平の罫線にマージンを設定する
    renderer.hr = () => {
      return `<hr class="my-5">`
    }

    // リストの要素にマージンを設定する
    renderer.listitem = text => {
      return `<li class="my-1">${text}</li>`
    }

    // 引用に背景色とパディングを設定する
    renderer.blockquote = quote => {
      if (quote.indexOf("<p>") > -1) {
        quote = quote.replace("<p>", `<p class="bg-light p-3">`)
      }
      return `<blockquote>${quote}</blockquote>`
    }

    // WebP画像を表示する
    renderer.image = (href, title, text) => {
      const webp = href.replace("png", "webp")
      return `<picture><source srcset="${webp}" type="image/webp"><img src="${href}" alt="${text}"></picture>`
    }

    // 外部リンクを別タブで開く
    // リンクのカラーを変更する
    renderer.link = (href, title, text) => {
      if (href.slice(0, 1) === "/") {
        return `<a href="${href}" class="c-link">${text}</a>`
      }
      return `<a href="${href}" target="_blank" class="c-link">${text}</a>`
    }

    // レスポンシブテーブルを表示する
    renderer.table = (header, body) => {
      if (body) {
        body = "<tbody>" + body + "</tbody>"
      }
      return `<div class="table-responsive"><table class="table"><thead>${header}</thead>${body}</table></div>`
    }

    // テーブルのセルの中央寄せを解除する
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
