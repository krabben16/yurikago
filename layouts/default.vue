<template>
  <div>
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
  asyncData () {
    console.log('test')
    return {}
  },
  created () {
    // イベントリスナー
    this.$nuxt.$on('setPageName', this.setPageName)
  },
  data () {
    return {
      pageName: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.container-fluid {
  // デフォルトのパディングをリセット
  padding-left: 0;
  padding-right: 0;

  // jsでフェードインする
  visibility: hidden;
}
</style>
