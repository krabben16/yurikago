<template>
  <div class="flex flex-row">
    <img
      class="rounded-full h-12 w-12 mr-4"
      :src="`https://github.com/${githubId}.png`"
    />
    <nuxt-link to="/" class="text-3xl my-auto">
      {{ siteName }}
    </nuxt-link>
  </div>
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

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
