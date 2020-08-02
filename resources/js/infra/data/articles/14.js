import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/14.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 14,
  title: "JavaScript 整数の連番を配列として取得する",
  posted_at: "2020-02-05",
  tags: [tagUseCase.getTagByName("JavaScript")],
  content: content
})
