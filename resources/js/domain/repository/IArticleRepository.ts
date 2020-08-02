import { Article } from "~/resources/js/domain/model/article.js"

export interface IArticleRepository {
  getArticles(): Article[],
  getArticleById(id: number): Article | boolean,
  getArticlesByTagId(tagId: number): Article[] | boolean,
  getTotalArticleCount(): number
}
