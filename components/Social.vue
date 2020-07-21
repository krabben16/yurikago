<template>
  <div class="text-center bg-secondary py-5">
    <a :href="githubUrl" target="_blank" @click="$ga.event('header', 'click', 'github')">
      <!-- NOTE: アイコンは親要素のサイズとカラーを継承する -->
      <span class="text-white">
        <i class="fab fa-github fa-3x" />
      </span>
    </a>
  </div>
</template>

<script>
export default {
  created() {
    this.githubUrl = process.env.GITHUB_URL
  }
}
</script>
