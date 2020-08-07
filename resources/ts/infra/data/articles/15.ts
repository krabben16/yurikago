import markdown from "~/resources/markdown/articles/15.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 15,
  title: "PHP5.3 全角ひらがなの濁点を削除する",
  postedAt: "2020-03-25",
  tags: [tagListWithKey.PHP],
  content: markdown
}

export default article
