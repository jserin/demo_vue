<template>
  <div class="spinner-overlay">
    <div class="spinner-border text-light" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>