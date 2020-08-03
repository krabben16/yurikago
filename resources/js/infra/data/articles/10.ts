import content from "~/resources/markdown/articles/10.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 10,
  title: "JavaScriptはDOMツリーの構築中に実行される",
  postedAt: "2020-01-14",
  tags: [
    tagListWithKey.GoogleChrome,
    tagListWithKey.JavaScript,
    tagListWithKey.HTML
  ],
  content: content
}

export default article
