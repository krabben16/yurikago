import markdown from "~/resources/markdown/articles/19.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 19,
  title: "@nuxtjs/eslint-config-typescript が有効にするESLintのルール",
  postedAt: "2020-08-04",
  tags: [tagListWithKey.NuxtJS, tagListWithKey.TypeScript],
  content: markdown
}

export default article
