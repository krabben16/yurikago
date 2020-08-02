import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/3.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 3,
  title: "Chrome SeleniumIDE 配列を定義してループする",
  posted_at: "2019-03-14",
  tags: [tagUseCase.getTagByName("Google Chrome"), tagUseCase.getTagByName("Selenium")],
  content: content
})
