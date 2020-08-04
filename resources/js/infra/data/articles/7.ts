import markdown from "~/resources/markdown/articles/7.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

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