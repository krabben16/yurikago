import content from "~/resources/markdown/articles/13.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default {
  id: 13,
  title: "Nuxt.js Homesteadにhttpsでリクエストしてレスポンスを取得する",
  posted_at: "2020-02-02",
  tags: [tagUseCase.getTagByName("Node.js"), tagUseCase.getTagByName("Homestead"), tagUseCase.getTagByName("Nuxt.js")],
  content: content
}
