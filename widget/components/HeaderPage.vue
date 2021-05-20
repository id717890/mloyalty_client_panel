<template>
  <div class="ml-header-page">
    <nuxtLink class="ml-12 mr-4 d-flex align-items-center" :to="backUrl">
      <img src="/image/arrow-left.svg" class="mr-1" alt="" />
      <span class="ml-header-page_link"> Назад </span>
    </nuxtLink>
    <div class="ml-header-page_title mr-16 pr-8">{{ title }}</div>
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
  position: sticky;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  border-bottom: 1px solid #e6e6e6;
  background: #f6f6f6 !important;
  display: flex;
  align-items: center;

  .ml-header-page_link {
    display: flex;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    align-items: center;
    letter-spacing: -0.03em;
    color: #999999;
  }

  .ml-header-page_title {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
    color: #4d4d4d;
  }
}
</style>
