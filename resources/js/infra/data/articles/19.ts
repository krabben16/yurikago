import markdown from "~/resources/markdown/articles/19.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 19,
  title: "@nuxtjs/eslint-config-typescript が有効にするESLintのルール",
  postedAt: "2020-08-04",
  tags: [tagListWithKey.NuxtJS, tagListWithKey.TypeScript],
  content: markdown
}

export default article
