import markdown from "~/resources/markdown/articles/6.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 6,
  title: "Homestead PostgreSQLにHeidiSQLで接続する",
  postedAt: "2019-12-30",
  tags: [
    tagListWithKey.Homestead,
    tagListWithKey.HeidiSQL,
    tagListWithKey.PostgreSQL
  ],
  content: markdown
}

export default article
