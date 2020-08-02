import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/11.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 11,
  title: "Nuxt.js サイトマップXMLを動的に出力する",
  posted_at: "2020-01-21",
  tags: [tagUseCase.getTagByName("Nuxt.js"), tagUseCase.getTagByName("Postman")],
  content: content
})
