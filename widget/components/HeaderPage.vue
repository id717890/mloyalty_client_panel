<template>
  <div class="ml-header-page">
    <nuxtLink
      class="ml-12 mr-4 ml-title-14-20 d-flex align-items-center"
      :to="backUrl"
    >
      <img src="/image/arrow-left.png" class="mr-1" alt="" />
      <span class="ml-title-14-20 ml-text-grey"> Назад </span>
    </nuxtLink>
    <div class="ml-header-page_title mr-4 ml-text-16-24-600">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    backUrl: {
      type: String,
      required: false,
      default: '/dashboard',
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
}
</script>

<style lang="scss">
.ml-header-page {
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;

  .ml-header-page_title {
    display: flex;
    flex-grow: 1;
    justify-content: center;
  }
}
</style>
