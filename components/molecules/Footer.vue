<template>
  <footer class="text-center py-5">
    <div>
      <a
        :href="githubUrl"
        target="_blank"
        @click="$ga.event('view', 'click', 'github')"
        ><img
          :src="`https://github.com/${githubId}.png`"
          alt="avatar"
          height="64"
          width="64"
          class="rounded-pill"
          loading="lazy"
      /></a>
    </div>
    <div class="text-light mt-3">
      <div>
        &copy; {{ new Date().getFullYear() }} {{ siteOwner }}, Built with
        Nuxt.js
      </div>
      <div>This site uses Google Analytics.</div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      siteOwner: process.env.SITE_OWNER,
      githubId: process.env.GITHUB_ID,
      githubUrl: process.env.GITHUB_URL,
    }
  },
})
</script>
