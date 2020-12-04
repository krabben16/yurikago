<template>
  <footer class="text-center py-5">
    <div class="text-muted">
      &copy; {{ copyrightYear }} {{ siteOwner }}, Built with Nuxt.js
    </div>
    <div class="text-muted">This site uses Google Analytics.</div>
  </footer>
</template>

<script lang="ts">
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $dayjs } = useContext()

    return {
      copyrightYear: $dayjs().format('YYYY'),
      siteOwner: process.env.SITE_OWNER,
    }
  },
})
</script>
