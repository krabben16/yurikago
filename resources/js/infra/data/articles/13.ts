import content from "~/resources/markdown/articles/13.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 13,
  title: "Nuxt.js Homesteadにhttpsでリクエストしてレスポンスを取得する",
  posted_at: "2020-02-02",
  tags: [tagListWithKey["Node.js"], tagListWithKey["Homestead"], tagListWithKey["Nuxt.js"]],
  content: content
}

export default article
