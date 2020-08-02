import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/7.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 7,
  title: "CentOS6 Xdebug+VSCodeでPHP5.3をデバッグする",
  posted_at: "2020-01-01",
  tags: [
    tagUseCase.getTagByName("CentOS"),
    tagUseCase.getTagByName("PHP"),
    tagUseCase.getTagByName("VSCode"),
    tagUseCase.getTagByName("Xdebug")
  ],
  content: content
})
