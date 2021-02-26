<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="ml-client-info">
      <div class="ml-text-24-32-600 mb-3">Александр Лигомин</div>
      <div class="ml-text-18-20 mb-4">+ 7 911 227 02 44</div>
      <div class="ml-text-32-40-600">{{ price }} ₽</div>
    </div>
    <div class="ml-orders-list">
      <template v-if="!orders">
        <div
          class="d-flex flex-grow-1 justify-content-center flex-column align-items-center"
        >
          <img src="~/static/image/undraw_empty_cart.svg" class="mb-8" alt="" />
          <div class="ml-text-20-28-500 px-10 mb-8">
            Здесь будет отображться история Ваших покупок и движения бонусов.
          </div>
          <a href="#" class="ml-black-btn" @click.prevent="startBuy">
            <v-icon>mdi-plus</v-icon>
            Начать покупки
          </a>
        </div>
      </template>
      <template v-else>
        <div class="ml-client-orders">
          <div v-for="order in orders" :key="order.id" class="ml-order-block">
            <div class="d-flex">
              <div class="ml-text-19-22-500 flex-grow-1">
                {{ order.title }}
              </div>
              <div class="d-flex flex-column">
                <div class="ml-text-13-18">{{ order.date }}</div>
                <div class="ml-text-13-18">{{ order.time }}</div>
              </div>
            </div>
            <div v-if="order.shopName" class="ml-text-15-18">
              {{ order.shopName }}
            </div>
            <div v-if="orderType(order)">
              <span class="ml-text-15-18">{{ orderType(order) }}</span>
              <span class="ml-text-17-18">{{ order.sum }}₽</span>
            </div>
            <div class="d-flex align-items-center flex-row flex-nowrap">
              <div
                v-if="order.bonus"
                class="ml-text-15-18-700 ml-text-green1 mr-5"
              >
                {{ order.bonus }} Б
              </div>
              <div
                v-if="order.bonusUse"
                class="ml-text-15-18-700 ml-text-red1 mr-5"
              >
                {{ order.bonusUse }} Б
              </div>
              <div
                v-if="order.type !== 'bonus'"
                class="ml-text-13-22 flex-grow-1 text-right"
              >
                <a href="#" @click.prevent="openDetails">
                  Подробнее
                  <v-icon>mdi-chevron-right</v-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data: () => ({
    price: 0,
  }),
  computed: {
    ...mapState({
      phone: (state) => state.verify.phone,
      orders: (state) => state.order.orders,
    }),
  },
  methods: {
    startBuy() {
      this.$store.commit('order/ADD_FAKE_ORDERS')
      this.price = '2 892'
    },
    openDetails() {
      this.$router.push({ name: 'dashboard-order-id', params: { id: 1234 } })
    },
    orderType(order) {
      const type = order?.type
      switch (type) {
        case 'refund':
          return 'Возврат /  '
        case 'buy':
          return 'Покупка /  '
        default:
          return null
      }
    },
  },
}
</script>

<style></style>
