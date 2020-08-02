import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/12.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 12,
  title: "Nuxt.js Disqusのコメントフォームを表示する",
  posted_at: "2020-01-27",
  tags: [
    tagUseCase.getTagByName("Google Chrome"),
    tagUseCase.getTagByName("Nuxt.js"),
    tagUseCase.getTagByName("Disqus")
  ],
  content: content
})
