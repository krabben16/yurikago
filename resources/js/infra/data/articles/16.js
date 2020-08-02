import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/16.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 16,
  title: "curlでHTTPステータスコードを取得する",
  posted_at: "2020-04-27",
  tags: [tagUseCase.getTagByName("Git for Windows"), tagUseCase.getTagByName("cURL")],
  content: content
})
