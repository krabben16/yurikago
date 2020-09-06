<template>
  <div class="container-fluid bg-white min-vh-100">
    <div class="row">
      <div class="col-12 col-sm-6 mx-sm-auto py-5">
        <ArticleList :articles="articles" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import ArticleList from "~/components/ArticleList.vue"

export default {
  components: {
    ArticleList
  },
  async asyncData (context) {
    const tagId = isNaN(context.params.id) ? 1 : parseInt(context.params.id)
    const articles = await context.$content("articles").where({ "tags.id": { $contains: tagId } }).sortBy("id", "desc").fetch()

    if (articles.length === 0) {
      return context.error({ statusCode: 404, message: "Not Found" })
    }

    return {
      tagId,
      articles
    }
  },
  created () {
    const tag = this.getTagObject(this.tagId, this.articles)

    // TDK
    this.title = tag.name
    this.description = `タグ「${tag.name}」を含む記事の一覧です。`

    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: `/tags/${tag.id}`
      }
    ]
  },
  mounted () {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"]),
    /**
     * tagIdと一致するオブジェクトを取得する
     * @param {number} tagId
     * @param {object[]} articleList
     * @return {object}
     */
    getTagObject (tagId, articleList) {
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
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          name: "description",
          content: this.description
        },
        {
          property: "og:title",
          content: `${this.title} | Yurikago Blog`
        },
        {
          property: "og:type",
          content: "blog"
        },
        {
          property: "og:description",
          content: this.description
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
          innerHTML: this.$getBreadcrumbSchema(this.breadcrumbItemList),
          type: "application/ld+json"
        }
      ],
      __dangerouslyDisableSanitizersByTagID: {
        breadcrumbSchema: ["innerHTML"]
      }
    }
  }
}
</script>
