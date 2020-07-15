<template>
  <div>
    <Header />
    <nuxt />
    <Breadcrumb />
    <Footer />
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
