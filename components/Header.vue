<template>
  <div class="jumbotron jumbotron-fluid bg-white text-center">
    <div class="container py-4">
      <h2 class="jumbotron-heading">{{ title }}</h2>
      <p class="lead text-muted">{{ subTitle }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
  },
})
</script>
