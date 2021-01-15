<template>
  <nuxt-link to="/" class="flex flex-row disableDecolation">
    <img
      class="rounded-full h-12 w-12 flex items-center justify-center mr-4"
      :src="`https://github.com/${githubId}.png`"
    />
    <div class="text-3xl">
      {{ siteName }}
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      githubId: process.env.GITHUB_ID,
      siteName: process.env.SITE_NAME,
    }
  },
})
</script>
