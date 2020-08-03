import content from "~/resources/markdown/articles/8.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 8,
  title: "Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する",
  postedAt: "2020-01-03",
  tags: [tagListWithKey.Chromium, tagListWithKey.NodeJS, tagListWithKey.Puppeteer],
  content: content
}

export default article
