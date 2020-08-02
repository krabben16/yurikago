import content from "~/resources/markdown/articles/9.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 9,
  title: "Marked.jsを拡張してWebP画像を表示する",
  posted_at: "2020-01-05",
  tags: [tagListWithKey["Marked.js"], tagListWithKey["Nuxt.js"]],
  content: content
}

export default article
