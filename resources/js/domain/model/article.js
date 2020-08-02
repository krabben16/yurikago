export class Article {
  constructor(obj) {
    this.id = obj.id
    this.title = obj.title
    this.posted_at = obj.posted_at
    this.tags = obj.tags
    this.content = obj.content
  }
}
