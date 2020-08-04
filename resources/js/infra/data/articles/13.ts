import markdown from "~/resources/markdown/articles/13.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 13,
  title: "NuxtJS Homesteadにhttpsでリクエストしてレスポンスを取得する",
  postedAt: "2020-02-02",
  tags: [tagListWithKey.NodeJS, tagListWithKey.Homestead, tagListWithKey.NuxtJS],
  content: markdown
}

export default article
