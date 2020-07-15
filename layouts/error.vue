<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-sm-8 mx-sm-auto">
        <div class="l-error">
          <p v-if="error.statusCode === 404">{{ error.message }}</p>
          <p v-else>Error</p>
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
  created() {
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
  mounted() {
    // パンくず
    this.changeBreadcrumbItemList(this.breadcrumbItemList)
  },
  methods: {
    ...mapActions("breadcrumb", ["changeBreadcrumbItemList"])
  },
  head() {
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
