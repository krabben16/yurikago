import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/4.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 4,
  title: "CentOS7 CLIでLighthouseを実行する",
  posted_at: "2019-07-28",
  tags: [
    tagUseCase.getTagByName("CentOS"),
    tagUseCase.getTagByName("Node.js"),
    tagUseCase.getTagByName("Puppeteer"),
    tagUseCase.getTagByName("Lighthouse")
  ],
  content: content
})
