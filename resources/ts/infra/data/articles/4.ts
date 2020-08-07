import markdown from "~/resources/markdown/articles/4.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 4,
  title: "CentOS7 CLIでLighthouseを実行する",
  postedAt: "2019-07-28",
  tags: [
    tagListWithKey.CentOS,
    tagListWithKey.NodeJS,
    tagListWithKey.Puppeteer,
    tagListWithKey.Lighthouse
  ],
  content: markdown
}

export default article
