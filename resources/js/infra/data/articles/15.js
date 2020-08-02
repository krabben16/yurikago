import content from "~/resources/markdown/articles/15.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default {
  id: 15,
  title: "PHP5.3 全角ひらがなの濁点を削除する",
  posted_at: "2020-03-25",
  tags: [tagUseCase.getTagByName("PHP")],
  content: content
}
