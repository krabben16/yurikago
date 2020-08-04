import markdown from "~/resources/markdown/articles/17.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 17,
  title: "画像をIE11でpreloadする",
  postedAt: "2020-07-10",
  tags: [tagListWithKey.JavaScript, tagListWithKey.HTML],
  content: markdown
}

export default article
