import markdown from "~/resources/markdown/articles/11.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 11,
  title: "NuxtJS サイトマップXMLを動的に出力する",
  postedAt: "2020-01-21",
  tags: [tagListWithKey.NuxtJS, tagListWithKey.Postman],
  content: markdown
}

export default article
