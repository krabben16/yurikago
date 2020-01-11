<template>
  <div class="container-fluid">
    <Header />
    <div class="row no-gutters">
      <div class="col-12 col-sm-6 mx-auto">
        <nuxt />
      </div>
    </div>
    <div class="row no-gutters">
      <div class="col-12 col-sm-6 mx-auto">
        <Breadcrumb :pageName="pageName" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Breadcrumb from '~/components/Breadcrumb.vue'

export default {
  components: {
    Header,
    Footer,
    Breadcrumb
  },
  methods: {
    setPageName (pageName) {
      this.pageName = pageName || ''
    }
  },
  created () {
    // イベントリスナー
    this.$nuxt.$on('setPageName', this.setPageName)
  },
  data () {
    return {
      pageName: ''
    }
  },
  head () {
    const uid = this._uid;
    return {
      // 構造化マークアップ
      script: [{
        uid,
        innerHTML: this.$getBreadcrumbSchema(this.pageName, this.$route.path),
        type: 'application/ld+json'
      }],
      __dangerouslyDisableSanitizersByTagID: {
        [uid]: 'innerHTML'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  // デフォルトのパディングをリセット
  padding-left: 0;
  padding-right: 0;
}
</style>
