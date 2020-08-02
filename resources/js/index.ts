import { ArticleRepository } from "~/resources/js/infra/repository/articleRepository.ts"
import { ArticleUseCase } from "~/resources/js/useCase/articleUseCase.ts"
import { TagRepository } from "~/resources/js/infra/repository/tagRepository.ts"
import { TagUseCase } from "~/resources/js/useCase/tagUseCase.ts"

const articleRepository = new ArticleRepository()
export const articleUseCase = new ArticleUseCase(articleRepository)

const tagRepository = new TagRepository()
export const tagUseCase = new TagUseCase(tagRepository)
