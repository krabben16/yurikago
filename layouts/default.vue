<template>
  <div>
    <Header />
    <nuxt />
    <Social />
    <Footer />
  </div>
</template>

<script>
import Header from "~/components/Header.vue"
import Social from "~/components/Social.vue"
import Footer from "~/components/Footer.vue"

export default {
  components: {
    Header,
    Social,
    Footer
  }
}
</script>
