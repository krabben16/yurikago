<template>
  <a href="javascript:void(0);" @click="$ga.event('view', 'click', 'twitter')">
    <ShareNetwork network="twitter" tag="div" :url="url" :title="title">
      <span class="text-white">
        <i class="fab fa-twitter fa-2x" />
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
