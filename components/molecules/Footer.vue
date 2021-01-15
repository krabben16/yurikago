<template>
  <footer class="text-center">
    <div>
      &copy; {{ new Date().getFullYear() }} {{ siteOwner }}, Built with Nuxt.js
    </div>
    <div>This site uses Google Analytics.</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      siteOwner: process.env.SITE_OWNER,
      githubUrl: process.env.GITHUB_URL,
    }
  },
})
</script>
