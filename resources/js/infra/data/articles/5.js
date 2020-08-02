import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/5.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 5,
  title: "Alpine Linux 3.10.3 Python3 NLTKを実行する",
  posted_at: "2019-12-19",
  tags: [tagUseCase.getTagByName("Alpine Linux"), tagUseCase.getTagByName("NLTK"), tagUseCase.getTagByName("Python")],
  content: content
})
