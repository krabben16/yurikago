<template>
  <nav class="navbar navbar-dark py-4">
    <nuxt-link to="/" class="navbar-brand">
      {{ siteName }}
    </nuxt-link>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      siteName: process.env.SITE_NAME,
    }
  },
})
</script>
