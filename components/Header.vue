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
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navmenu">
      <div class="navbar-nav">
        <a class="nav-item nav-link" :href="githubUrl" target="_blank" @click="$ga.event('view', 'click', 'github')">GitHub</a>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  data () {
    return {
      githubUrl: process.env.GITHUB_URL
    }
  }
})
</script>
