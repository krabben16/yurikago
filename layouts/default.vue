<template>
  <div>
    <div class="container-fluid">
      <Header />
      <div class="row">
        <div class="col-11 mx-auto col-sm-5 mx-sm-auto">
          <nuxt />
        </div>
      </div>
      <Breadcrumb />
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"
import Breadcrumb from "~/components/Breadcrumb.vue"

export default {
  components: {
    Header,
    Footer,
    Breadcrumb
  }
}
</script>
