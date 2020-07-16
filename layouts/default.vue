<template>
  <div>
    <Header />
    <nuxt />
    <Social class-name="text-center bg-light py-5" />
    <Footer class-name="text-center bg-dark py-5" />
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
