<template>
  <div class="d-flex flex-column flex-grow-1">
    <MlHeaderPage title="История бонусов" />
    <div class="ml-orders-list pt-4">
      <template v-if="!allOrdersAndBonuses">
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
        <div class="ml-client-orders pt-0">
          <div
            v-for="order in orders"
            :key="order.id"
            class="ml-white-block pa-0 mb-4"
          >
            <div class="pt-4 px-5 pb-5">
              <!-- <div v-for="order in orders" :key="order.id" class="ml-order-block"> -->
              <div class="d-flex">
                <div class="ml-text-17-22-700 flex-grow-1">
                  {{ order.title }}
                </div>
                <div class="d-flex flex-column">
                  <div class="ml-text-13-18 text-right">{{ order.date }}</div>
                  <div class="ml-text-13-18 text-right">{{ order.time }}</div>
                </div>
              </div>
              <div v-if="order.shopName" class="ml-text-13-16-700 mb-1">
                {{ order.shopName }}
              </div>
              <div v-if="orderType(order)" class="mb-1">
                <span class="ml-text-13-18">{{ orderType(order) }}</span>
                <span class="ml-text-17-18">{{ order.sum }}₽</span>
              </div>
              <div class="d-flex align-items-center flex-row flex-nowrap">
                <div
                  v-if="order.bonus"
                  class="ml-text-15-18-700 mr-5"
                  :class="order.color"
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
                  v-if="order.type !== 'bonus' && order.items.length > 0"
                  class="ml-order-detail-link ml-text-13-22"
                  style="margin-right: -7px"
                  @click.prevent="openDetails(order)"
                >
                  <span class="ml-text-13-22">Подробнее</span>
                  <v-icon>mdi-chevron-right</v-icon>
                </div>
              </div>
            </div>
            <!-- <div>
              <div class="ml-order-detail-link px-5">
                <span>Детализация</span>
              </div>
            </div> -->
          </div>
          <a
            v-if="!endOfOrders"
            href="#"
            class="ml-black-btn"
            @click.prevent="showMore"
          >
            Загрузить ещё
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'

const addOrders = 25

export default {
  directives: { mask },
  layout: 'dashboard',
  data: () => ({
    price: 0,
    showOrders: 25,
  }),
  computed: {
    ...mapGetters('client', ['allOrdersAndBonuses']),
    ...mapState({
      clientInfo: (state) => state?.client?.clientInfo,
    }),
    orders() {
      return this.allOrdersAndBonuses?.slice(0, this.showOrders)
    },
    totalSum() {
      return this.allOrdersAndBonuses.reduce((prev, current) => {
        // console.log(prev, current)
        const currentSum = parseInt(current?.sum)
        if (Number.isInteger(currentSum)) return prev + currentSum
        return prev
      }, 0)
    },
    endOfOrders() {
      return this.showOrders >= this.allOrdersAndBonuses?.length
    },
  },
  methods: {
    showMore() {
      this.showOrders += addOrders
    },
    startBuy() {
      this.$store.commit('order/ADD_FAKE_ORDERS')
      this.price = '2 892'
    },
    openDetails(order) {
      this.$router.push({
        name: 'dashboard-order-id',
        params: { id: order.id },
      })
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

<style lang="scss">
.ml-order-detail-link {
  flex-grow: 1;
  text-align: right;
  cursor: pointer;
}

.ml-order-detail-link:hover {
  span {
    color: #4d4d4d;
  }
}
</style>
