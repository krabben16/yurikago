import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/17.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 17,
  title: "画像をIE11でpreloadする",
  posted_at: "2020-07-10",
  tags: [tagUseCase.getTagByName("JavaScript"), tagUseCase.getTagByName("HTML")],
  content: content
})
