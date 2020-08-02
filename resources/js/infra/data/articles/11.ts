import content from "~/resources/markdown/articles/11.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 11,
  title: "Nuxt.js サイトマップXMLを動的に出力する",
  posted_at: "2020-01-21",
  tags: [tagListWithKey["Nuxt.js"], tagListWithKey["Postman"]],
  content: content
}

export default article
