<template>
  <div>
    <Header />
    <nuxt />
    <Footer class-name="l-footer my-5" />
  </div>
</template>

<script>
import Header from "~/components/Header.vue"
import Footer from "~/components/Footer.vue"

export default {
  components: {
    Header,
    Footer
  }
}
</script>
