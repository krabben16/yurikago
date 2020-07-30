export class ArticleEntity {
  constructor(id, title, posted_at, tags, content) {
    this.id = id
    this.title = title
    this.posted_at = posted_at
    this.tags = tags
    this.content = content
  }
}
