import markdown from "~/resources/markdown/articles/9.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 9,
  title: "MarkedJSを拡張してWebP画像を表示する",
  postedAt: "2020-01-05",
  tags: [tagListWithKey.MarkedJS, tagListWithKey.NuxtJS],
  content: markdown
}

export default article
