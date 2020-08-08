import markdown from "~/resources/markdown/articles/7.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 7,
  title: "CentOS6 Xdebug+VSCodeでPHP5.3をデバッグする",
  postedAt: "2020-01-01",
  tags: [
    tagListWithKey.CentOS,
    tagListWithKey.PHP,
    tagListWithKey.VSCode,
    tagListWithKey.Xdebug
  ],
  content: markdown
}

export default article
