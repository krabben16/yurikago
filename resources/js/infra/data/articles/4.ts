import content from "~/resources/markdown/articles/4.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 4,
  title: "CentOS7 CLIでLighthouseを実行する",
  posted_at: "2019-07-28",
  tags: [
    tagListWithKey["CentOS"],
    tagListWithKey["Node.js"],
    tagListWithKey["Puppeteer"],
    tagListWithKey["Lighthouse"]
  ],
  content: content
}

export default article
