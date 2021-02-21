<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center h100 index"
  >
    <img src="~/static/image/envelope.svg" class="mb-6" alt="" />
    <span class="ml-text-20-28-500 mx-16 text-center mb-6">
      Дорогой друг! Вступай в наш клуб и совершай выгодные покупки!
    </span>
    <nuxt-link class="ml-black-btn" to="/registration">
      Зарегистрироваться
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default',
  middleware: ['mlauth'],
}
</script>
