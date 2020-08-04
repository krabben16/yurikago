import markdown from "~/resources/markdown/articles/14.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 14,
  title: "JavaScript 整数の連番を配列として取得する",
  postedAt: "2020-02-05",
  tags: [tagListWithKey.JavaScript],
  content: markdown
}

export default article
