<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-9 mx-sm-auto">
        <div class="min-vh-100 d-flex justify-content-center align-items-center">
          <h1 v-if="error.statusCode === 404">
            {{ error.statusCode }} {{ error.message }}
          </h1>
          <h1 v-else>
            {{ error.statusCode }} Error
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { BreadcrumbItem } from "~/interfaces/BreadcrumbItem"

export default Vue.extend({
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  head () {
    const titleValue: string = "エラー"
    const descriptionValue: string = "エラーページです！"
    const breadcrumbItemList: BreadcrumbItem[] = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: titleValue,
        path: this.$route.path
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
