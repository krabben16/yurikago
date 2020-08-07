import markdown from "~/resources/markdown/articles/12.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 12,
  title: "NuxtJS Disqusのコメントフォームを表示する",
  postedAt: "2020-01-27",
  tags: [
    tagListWithKey.GoogleChrome,
    tagListWithKey.NuxtJS,
    tagListWithKey.Disqus
  ],
  content: markdown
}

export default article
