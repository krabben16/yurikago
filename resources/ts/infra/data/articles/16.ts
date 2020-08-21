import markdown from "~/resources/markdown/articles/16.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 16,
  title: "curlでHTTPステータスコードを取得する",
  postedAt: "2020-04-27",
  tags: [tagListWithKey.Bash],
  content: markdown
}

export default article
