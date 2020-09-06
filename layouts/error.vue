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

<script>
import { mapActions } from "vuex"

export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  created () {
    // TDK
    this.title = "エラー"
    this.description = "エラーページです！"

    this.breadcrumbItemList = [
      {
        name: "トップページ",
        path: "/"
      },
      {
        name: this.title,
        path: this.$route.path
      }
    ]
  },
  mounted () {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head () {
    return {
      title: this.title,
      meta: [
        {
          "description": this.description
        }
      ]
    }
  }
}
</script>
