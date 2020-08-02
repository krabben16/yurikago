import content from "~/resources/markdown/articles/15.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 15,
  title: "PHP5.3 全角ひらがなの濁点を削除する",
  posted_at: "2020-03-25",
  tags: [tagListWithKey["PHP"]],
  content: content
}

export default article
