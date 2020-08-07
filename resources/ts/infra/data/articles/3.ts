import markdown from "~/resources/markdown/articles/3.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 3,
  title: "Chrome SeleniumIDE 配列を定義してループする",
  postedAt: "2019-03-14",
  tags: [tagListWithKey.GoogleChrome, tagListWithKey.Selenium],
  content: markdown
}

export default article
