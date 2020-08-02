import content from "~/resources/markdown/articles/1.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default {
  id: 1,
  title: "CentOS7 Tesseract3.04をビルドして実行する",
  posted_at: "2018-07-09",
  tags: [tagUseCase.getTagByName("CentOS"), tagUseCase.getTagByName("Tesseract")],
  content: content
}
