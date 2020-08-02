import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/10.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 10,
  title: "JavaScriptはDOMツリーの構築中に実行される",
  posted_at: "2020-01-14",
  tags: [
    tagUseCase.getTagByName("Google Chrome"),
    tagUseCase.getTagByName("JavaScript"),
    tagUseCase.getTagByName("HTML")
  ],
  content: content
})
