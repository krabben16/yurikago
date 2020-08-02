import { Article } from "~/resources/js/domain/model/Article.js"
import content from "~/resources/markdown/articles/18.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 18,
  title: "debuggerやconsole.traceなどを使ってJavaScriptをデバッグする",
  posted_at: "2020-07-28",
  tags: [tagUseCase.getTagByName("Google Chrome"), tagUseCase.getTagByName("JavaScript")],
  content: content
})
