<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-dark navbar-dark">
    <nuxt-link :to="{ name: 'index' }" class="navbar-brand">
      Yurikago Blog
    </nuxt-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navmenu"
      aria-controls="navmenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div id="navmenu" class="collapse navbar-collapse">
      <div class="navbar-nav">
        <a
          class="nav-item nav-link"
          :href="githubUrl"
          target="_blank"
          @click="$ga.event('view', 'click', 'github')"
          >GitHub</a
        >
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    return {
      githubUrl: process.env.GITHUB_URL,
    }
  },
})
</script>
