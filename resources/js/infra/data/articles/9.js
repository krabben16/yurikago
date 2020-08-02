import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/9.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 9,
  title: "Marked.jsを拡張してWebP画像を表示する",
  posted_at: "2020-01-05",
  tags: [tagUseCase.getTagByName("Marked.js"), tagUseCase.getTagByName("Nuxt.js")],
  content: content
})
