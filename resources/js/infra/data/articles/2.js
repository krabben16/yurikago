import content from "~/resources/markdown/articles/2.md"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const tagRepository = new TagRepository()
const tagUseCase = new TagUseCase(tagRepository)

export default {
  id: 2,
  title: "CentOS7 Puppeteerを実行してスクリーンショット画像を作成する",
  posted_at: "2018-12-20",
  tags: [
    tagUseCase.getTagByName("CentOS"),
    tagUseCase.getTagByName("Chromium"),
    tagUseCase.getTagByName("Node.js"),
    tagUseCase.getTagByName("Puppeteer")
  ],
  content: content
}
