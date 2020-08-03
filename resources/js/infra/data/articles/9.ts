import content from "~/resources/markdown/articles/9.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 9,
  title: "MarkedJSを拡張してWebP画像を表示する",
  postedAt: "2020-01-05",
  tags: [tagListWithKey.MarkedJS, tagListWithKey.NuxtJS],
  content: content
}

export default article
