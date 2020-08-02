import content from "~/resources/markdown/articles/16.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"


const article: IArticleObject = {
  id: 16,
  title: "curlでHTTPステータスコードを取得する",
  posted_at: "2020-04-27",
  tags: [tagListWithKey["cURL"], tagListWithKey["Git for Windows"]],
  content: content
}

export default article
