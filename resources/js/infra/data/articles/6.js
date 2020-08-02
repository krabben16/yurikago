import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/6.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 6,
  title: "Homestead PostgreSQLにHeidiSQLで接続する",
  posted_at: "2019-12-30",
  tags: [
    tagUseCase.getTagByName("Homestead"),
    tagUseCase.getTagByName("HeidiSQL"),
    tagUseCase.getTagByName("PostgreSQL")
  ],
  content: content
})
