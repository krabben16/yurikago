import markdown from "~/resources/markdown/articles/22.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 22,
  title: "CentOS7 CLIでLighthouse v6を実行する",
  postedAt: "2020-09-03",
  tags: [
    tagListWithKey.CentOS,
    tagListWithKey.NodeJS,
    tagListWithKey.Lighthouse
  ],
  content: markdown
}

export default article
