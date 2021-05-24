<template>
  <div class="v-application ml-error-page">
    <img src="/image/error-smile.svg" class="mb-4" alt="" />
    <Nuxt />
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.ml-error-page {
  height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
}
</style>
