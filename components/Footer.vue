<template>
  <footer class="text-center bg-dark py-5">
    <div class="text-light">
      &copy; 2020 {{ siteOwner }}, Built with Nuxt.js
    </div>
    <div class="text-light">This site uses Google Analytics.</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      siteOwner: process.env.SITE_OWNER,
    }
  },
})
</script>
