<template>
  <a href="javascript:void(0);" @click="$ga.event('view', 'click', 'line')">
    <ShareNetwork network="line" tag="div" :url="url" :title="title">
      <span class="text-white">
        <i class="fab fa-line fa-2x" />
      </span>
    </ShareNetwork>
  </a>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>
