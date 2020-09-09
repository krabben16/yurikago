<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" :title="`タグ: ${tag.name}`" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { BreadcrumbItem } from "interfaces/BreadcrumbItem"
import ArticleList from "~/components/ArticleList.vue"

interface DataType {
  articles: any,
  tag: any
}

export default Vue.extend({
  components: {
    ArticleList
  },
  async asyncData (context): Promise<DataType> {
    const tagId = parseInt(context.params.id)

    const articles = await context.$content("articles").where({ "tags.id": { $contains: tagId } }).sortBy("id", "desc").fetch()

    // 記事データが存在しない場合はエラー
    if (articles.length === 0) {
      context.error({ statusCode: 404, message: "Not Found" })
    }

    /**
     * tagIdと一致するオブジェクトを取得する
     */
    const getTagObject = (tagId: number, articleList: any): any => {
      for (let i = 0; i < articleList.length; i++) {
        const article = articleList[i]
        for (let j = 0; j < article.tags.length; j++) {
          const tag = article.tags[j]
          if (tag.id === tagId) {
            return tag
          }
        }
      }
      return {}
    }
    const tag = getTagObject(tagId, articles)

    return {
      articles,
      tag
    }
  },
  data (): DataType {
    return {
      articles: [],
      tag: {}
    }
  },
  head () {
    const titleValue: string = this.tag.name
    const descriptionValue: string = `タグ「${this.tag.name}」を含む記事の一覧です。`
    const breadcrumbItemList: BreadcrumbItem[] = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: titleValue,
        path: `/tags/${this.tag.id}`
      }
    ]

    const breadcrumbSchemaString: string = this.$createBreadcrumbSchema(breadcrumbItemList)

    return {
      title: titleValue,
      meta: [
        {
          name: "description",
          content: descriptionValue
        },
        {
          property: "og:title",
          content: `${titleValue} | Yurikago Blog`
        },
        {
          property: "og:type",
          content: "blog"
        },
        {
          property: "og:description",
          content: descriptionValue
        },
        {
          property: "og:url",
          content: process.env.FRONT_URL + this.$route.path
        }
      ],
      script: [
        // 構造化マークアップ
        {
          hid: "breadcrumbSchema",
          innerHTML: breadcrumbSchemaString,
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"]
      }
    }
  }
})
</script>
