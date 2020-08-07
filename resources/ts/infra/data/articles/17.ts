import markdown from "~/resources/markdown/articles/17.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 17,
  title: "画像をIE11でpreloadする",
  postedAt: "2020-07-10",
  tags: [tagListWithKey.JavaScript, tagListWithKey.HTML],
  content: markdown
}

export default article
