import markdown from "~/resources/markdown/articles/21.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 21,
  title: "Laradockを利用せずにLaravelのDocker環境を構築する",
  postedAt: "2020-08-22",
  tags: [tagListWithKey.PHP, tagListWithKey.Laravel, tagListWithKey.Docker, tagListWithKey.Nginx],
  content: markdown
}

export default article
