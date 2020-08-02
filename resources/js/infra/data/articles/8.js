import { Article } from "~/resources/js/domain/model/article.js"
import content from "~/resources/markdown/articles/8.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default new Article({
  id: 8,
  title: "Googleクローラーが画像の遅延読み込みを認識できるかどうか検証する",
  posted_at: "2020-01-03",
  tags: [tagUseCase.getTagByName("Chromium"), tagUseCase.getTagByName("Node.js"), tagUseCase.getTagByName("Puppeteer")],
  content: content
})
