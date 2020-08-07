import markdown from "~/resources/markdown/articles/18.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 18,
  title: "debuggerやconsole.traceなどを使ってJavaScriptをデバッグする",
  postedAt: "2020-07-28",
  tags: [tagListWithKey.GoogleChrome, tagListWithKey.JavaScript],
  content: markdown
}

export default article
