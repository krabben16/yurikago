<template>
  <div class="container max-w-screen-md px-4 prose">
    <Nav class="py-4" />
    <nuxt />
    <Footer class="py-8" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import ArticlesSetup from '~/setups/articles'
import Nav from '~/components/molecules/Nav.vue'
import Footer from '~/components/molecules/Footer.vue'

export default defineComponent({
  components: {
    Nav,
    Footer,
  },
  setup() {
    ArticlesSetup()
  }
})
</script>
