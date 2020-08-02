import { ArticleRepository } from "~/resources/js/infra/repository/articleRepository.js"
import { ArticleUseCase } from "~/resources/js/useCase/articleUseCase.js"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.js"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.js"

const articleRepository = new ArticleRepository()
export const articleUseCase = new ArticleUseCase(articleRepository)

const tagRepository = new TagRepository()
export const tagUseCase = new TagUseCase(tagRepository)
