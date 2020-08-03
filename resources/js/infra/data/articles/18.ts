import content from "~/resources/markdown/articles/18.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 18,
  title: "debuggerやconsole.traceなどを使ってJavaScriptをデバッグする",
  postedAt: "2020-07-28",
  tags: [tagListWithKey.GoogleChrome, tagListWithKey.JavaScript],
  content: content
}

export default article
