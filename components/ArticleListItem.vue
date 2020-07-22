<template>
  <div class="py-3" @mouseover="mouseOverAction" @mouseleave="mouseLeaveAction">
    <nuxt-link :to="{ name: 'articles-id', params: { id: article.id } }">
      <h2>
        {{ article.title }}
      </h2>
    </nuxt-link>
    <div class="text-muted">
      <i class="far fa-clock" />
      {{ article.posted_at }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMouseOver: false
    }
  },
  methods: {
    mouseOverAction() {
      this.isMouseOver = true
    },
    mouseLeaveAction() {
      this.isMouseOver = false
    }
  }
}
</script>
