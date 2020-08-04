import markdown from "~/resources/markdown/articles/2.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 2,
  title: "CentOS7 Puppeteerを実行してスクリーンショット画像を作成する",
  postedAt: "2018-12-20",
  tags: [
    tagListWithKey.CentOS,
    tagListWithKey.Chromium,
    tagListWithKey.NodeJS,
    tagListWithKey.Puppeteer
  ],
  content: markdown
}

export default article
