import content from "~/resources/markdown/articles/1.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 1,
  title: "CentOS7 Tesseract3.04をビルドして実行する",
  posted_at: "2018-07-09",
  tags: [tagListWithKey["CentOS"], tagListWithKey["Tesseract"]],
  content: content
}

export default article
