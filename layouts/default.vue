<template>
  <div>
    <div class="container-fluid">
      <Header />
      <div class="row no-gutters">
        <div class="col-12 col-sm-6 mx-sm-auto">
          <nuxt />
        </div>
      </div>
      <Breadcrumb :pageName="pageName" />
      <Footer />
    </div>
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
      this.pageName = pageName
    },
    clearPageName () {
      this.pageName = null
    }
  },
  created () {
    // イベントリスナー
    this.$nuxt.$on('setPageName', this.setPageName)
    this.$nuxt.$on('clearPageName', this.clearPageName)
  },
  data () {
    return {
      pageName: null
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  // デフォルトのパディングをリセット
  padding-left: 0;
  padding-right: 0;

  background-color: ghostwhite;
}
</style>
