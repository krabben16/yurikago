<template>
  <div class="markdown" v-html="htmlContent" />
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
     * @see https://github.com/markedjs/marked/blob/v0.8.2/src/Renderer.js
     */
    const renderer = new marked.Renderer()

    // 見出しに下線とマージンを設定する
    renderer.heading = (text, level, raw, slugger) => {
      if (level === 2) {
        return `<h${level} class="pb-3 my-5">${text}</h${level}>`
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

    // 引用分のテキストカラーを変更する
    renderer.blockquote = quote => {
      return `<blockquote class="blockquote text-muted">${quote}</blockquote>`
    }

    /**
     * 画像を中央寄せで表示する
     * https://getbootstrap.com/docs/4.4/content/images/#aligning-images
     *
     * サムネイル表示する
     * モーダル表示する
     */
    renderer.image = (href, title, text) => {
      return `
        <a href="javascript:void(0);" data-toggle="modal" data-target="#${text}">
          <img src="${href}" alt="${text}" class="mx-auto d-block img-thumbnail cursor-zoom-in">
        </a>
        <!-- モーダル -->
        <div class="modal fade" id="${text}" tabindex="-1" role="dialog" aria-labelledby="label1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="label1">${text}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img src="${href}" alt="${text}" class="mx-auto d-block img-thumbnail">
              </div>
            </div>
          </div>
        </div>
      `
    }

    // 外部リンクを別タブで開く
    // リンクのカラーを変更する
    renderer.link = (href, title, text) => {
      if (href.slice(0, 1) === "/") {
        return `<a href="${href}">${text}</a>`
      }
      return `<a href="${href}" target="_blank">${text}</a>`
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

    // https://github.com/markedjs/marked/blob/v0.8.2/docs/USING_ADVANCED.md#alternative-using-reference
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
