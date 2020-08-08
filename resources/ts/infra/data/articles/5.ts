import markdown from "~/resources/markdown/articles/5.md"
import { IArticleObject } from "~/resources/ts/infra/data/interface/IArticleObject"
import { tagListWithKey } from "~/resources/ts/infra/data/tags/all"

const article: IArticleObject = {
  id: 5,
  title: "AlpineLinux 3.10.3 Python3 NLTKを実行する",
  postedAt: "2019-12-19",
  tags: [tagListWithKey.AlpineLinux, tagListWithKey.NLTK, tagListWithKey.Python],
  content: markdown
}

export default article
