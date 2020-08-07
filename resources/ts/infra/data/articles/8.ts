import markdown from "~/resources/markdown/articles/8.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 8,
  title: "Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する",
  postedAt: "2020-01-03",
  tags: [tagListWithKey.Chromium, tagListWithKey.NodeJS, tagListWithKey.Puppeteer],
  content: markdown
}

export default article
