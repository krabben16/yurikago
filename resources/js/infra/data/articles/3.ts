import content from "~/resources/markdown/articles/3.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 3,
  title: "Chrome SeleniumIDE 配列を定義してループする",
  postedAt: "2019-03-14",
  tags: [tagListWithKey.GoogleChrome, tagListWithKey.Selenium],
  content: content
}

export default article
