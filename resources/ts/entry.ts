import { ArticleRepository } from "~/resources/ts/infra/repository/articleRepository"
import { ArticleUseCase } from "~/resources/ts/useCase/articleUseCase"
import { TagRepository } from "~/resources/ts/infra/repository/tagRepository"
import { TagUseCase } from "~/resources/ts/useCase/tagUseCase"

const articleRepository = new ArticleRepository()
export const articleUseCase = new ArticleUseCase(articleRepository)

const tagRepository = new TagRepository()
export const tagUseCase = new TagUseCase(tagRepository)
