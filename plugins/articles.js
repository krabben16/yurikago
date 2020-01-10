import { articleList } from '~/const/articleList'
import content1 from '~/assets/markdown/articles/1.md'
import content2 from '~/assets/markdown/articles/2.md'
import content3 from '~/assets/markdown/articles/3.md'
import content4 from '~/assets/markdown/articles/4.md'
import content5 from '~/assets/markdown/articles/5.md'
import content6 from '~/assets/markdown/articles/6.md'
import content7 from '~/assets/markdown/articles/7.md'
import content8 from '~/assets/markdown/articles/8.md'
import content9 from '~/assets/markdown/articles/9.md'

export default ({ app }, inject) => {
  app.getArticleWithContent = id => {
    let match = null
    articleList.map(article => {
      if (article.id == id) {
        match = article
        switch (id) {
          case 1:
            match.content = content1
            break
          case 2:
            match.content = content2
            break
          case 3:
            match.content = content3
            break
          case 4:
            match.content = content4
            break
          case 5:
            match.content = content5
            break
          case 6:
            match.content = content6
            break
          case 7:
            match.content = content7
            break
          case 8:
            match.content = content8
            break
          case 9:
            match.content = content9
            break
          default:
            break
        }
      }
    })
    return match
  }
}
