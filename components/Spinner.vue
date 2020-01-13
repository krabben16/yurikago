<template>
  <div class="spinner-wrapper">
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.spinner-wrapper {
  height: 100vh;
  width: 100%;
  
  // 中央寄せ
  display: flex;
  align-items: center;
  justify-content: center;

  .spinner-border {
    color: lightslategray !important;
  }
}
</style>
