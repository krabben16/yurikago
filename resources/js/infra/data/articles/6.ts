import content from "~/resources/markdown/articles/6.md"
import { IArticleObject } from "~/resources/js/infra/data/interface/IArticleObject.ts"
import { tagListWithKey } from "~/resources/js/infra/data/tags/all.ts"

const article: IArticleObject = {
  id: 6,
  title: "Homestead PostgreSQLにHeidiSQLで接続する",
  posted_at: "2019-12-30",
  tags: [
    tagListWithKey["Homestead"],
    tagListWithKey["HeidiSQL"],
    tagListWithKey["PostgreSQL"]
  ],
  content: content
}

export default article
