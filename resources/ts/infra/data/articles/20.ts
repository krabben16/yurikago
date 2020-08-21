import markdown from "~/resources/markdown/articles/20.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 20,
  title: "highlight.jsの設定を見直してwebpackのバンドル後のファイルサイズを削減する",
  postedAt: "2020-08-11",
  tags: [tagListWithKey.NuxtJS, tagListWithKey.Webpack, tagListWithKey.HighlightJS],
  content: markdown
}

export default article
