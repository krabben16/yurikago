import markdown from "~/resources/markdown/articles/10.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 10,
  title: "JavaScriptはDOMツリーの構築中に実行される",
  postedAt: "2020-01-14",
  tags: [
    tagListWithKey.GoogleChrome,
    tagListWithKey.JavaScript,
    tagListWithKey.HTML
  ],
  content: markdown
}

export default article
