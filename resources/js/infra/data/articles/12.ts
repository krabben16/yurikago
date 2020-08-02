import content from "~/resources/markdown/articles/12.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 12,
  title: "Nuxt.js Disqusのコメントフォームを表示する",
  posted_at: "2020-01-27",
  tags: [
    tagListWithKey["Google Chrome"],
    tagListWithKey["Nuxt.js"],
    tagListWithKey["Disqus"]
  ],
  content: content
}

export default article
