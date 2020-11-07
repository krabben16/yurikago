import { ArticleSchemaArgs } from '~/interfaces/ArticleSchemaArgs'

/**
 * 記事の構造化データを作成する
 * https://developers.google.com/search/docs/data-types/article?hl=ja
 * https://developers.google.com/search/docs/data-types/logo?hl=ja
 */
export const createArticleSchemaObject = (args: ArticleSchemaArgs): object => {
  return {
    '@context': 'http://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${process.env.FRONT_URL}/articles/${args.articleId}`,
    },
    headline: args.headlineValue,
    image: [`${process.env.FRONT_URL}/images/schema/16x9.jpg`],
    datePublished: args.datePublishedValue,
    dateModified: args.dateModifiedValue,
    author: {
      '@type': 'Person',
      name: process.env.ARTICLE_AUTHOR,
    },
    publisher: {
      '@type': 'Organization',
      name: process.env.ARTICLE_ORGANIZATION,
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.FRONT_URL}/images/schema/logo.jpg`,
      },
    },
  }
}
