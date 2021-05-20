<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="ml-client-info">
      <div class="d-flex flex-row flex-nowrap">
        <div class="ml-text-24-32-600 flex-grow-1">{{ fio }}</div>
        <v-btn icon class="ml-edit-fio-btn">
          <img src="/image/pencil1.svg" alt="" />
        </v-btn>
      </div>
      <div class="ml-text-18-20">
        <v-text-field
          v-mask="'+7 (###) ###-##-##'"
          class="ml-readonly-field pt-0"
          :value="phone"
          readonly
        ></v-text-field>
      </div>
      <div class="ml-white-block mb-8">
        <div class="ml-text-22-28-700">{{ fullbalance }} бонусов</div>
      </div>
      <div class="ml-white-block">
        <div class="d-flex align-items-center mb-1">
          <div class="ml-text-28-34-700">
            {{ purchasesSum }} <img src="/image/icon-rub.svg" alt="" />
          </div>
          <div class="ml-text-17-22 ml-3 mt-2">
            / &nbsp; {{ purchasesCount }} покупок
          </div>
        </div>
        <div class="mb-4">
          <v-progress-linear
            rounded
            value="75"
            color="#4D4D4D"
          ></v-progress-linear>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <a href="#" class="ml-silver2-btn ml-radius-20" @click.prevent="">
            <span
              class="ml-text-13-20-700 ml-text-grey2"
              style="line-height: 24px"
            >
              {{ levelName }}
            </span>
          </a>
          <span class="ml-text-15-24-700">{{ cashback }} кэшбек</span>
        </div>
      </div>

      <div class="ml-navs d-flex flex-column pt-12 pb-10">
        <nuxt-link
          to="/dashboard/promotions"
          class="ml-text-20-22-600 mb-5 ml-text-black2"
        >
          Акции
        </nuxt-link>
        <nuxt-link
          to="/dashboard/history"
          class="ml-text-20-22-600 mb-5 ml-text-black2"
        >
          История бонусов
        </nuxt-link>
        <nuxt-link
          to="/dashboard/faq"
          class="ml-text-20-22-600 mb-5 ml-text-black2"
        >
          Частые вопросы
        </nuxt-link>
        <nuxt-link
          to="/dashboard/support"
          class="ml-text-20-22-600 mb-5 ml-text-black2"
        >
          Поддержка
        </nuxt-link>
        <nuxt-link
          to="/dashboard/rules"
          class="ml-text-20-22-600 mb-5 ml-text-black2"
        >
          Правила
        </nuxt-link>
      </div>
    </div>
    <div class="ml-controlls">
      <a href="#" class="ml-black-btn py-5" @click.prevent="">
        <div class="d-flex align-items-center justify-content-center">
          <img src="/image/icon-right.svg" class="mr-2" alt="" />
          <span class="ml-text-16-20-500">Написать отзыв</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'

const addOrders = 15

export default {
  directives: { mask },
  layout: 'dashboard',
  data: () => ({
    price: 0,
    showOrders: 15,
  }),
  computed: {
    ...mapGetters('client', ['allOrdersAndBonuses']),
    ...mapState({
      clientInfo: (state) => state?.client?.clientInfo,
      phone: (state) => state.verify.phone,
    }),
    orders() {
      return this.allOrdersAndBonuses?.slice(0, this.showOrders)
    },
    fullbalance() {
      return this.clientInfo?.FullBalance
    },
    purchasesCount() {
      return this.clientInfo?.Purchases
    },
    purchasesSum() {
      return this.clientInfo?.PurchaseSum
    },
    totalSum() {
      return this.allOrdersAndBonuses.reduce((prev, current) => {
        console.log(prev, current)
        const currentSum = parseInt(current?.sum)
        if (Number.isInteger(currentSum)) return prev + currentSum
        return prev
      }, 0)
    },
    levelName() {
      return this.clientInfo?.LevelName
    },
    cashback() {
      return this.clientInfo?.Condition
    },
    fio() {
      let fio = ''
      // const surname = this.clientInfo?.Surname
      const name = this.clientInfo?.Name
      // const patronymic = this.clientInfo?.Patronymic
      // if (surname) `fio += `${surname} `
      if (name) fio += `${name} `
      // if (patronymic) fio += `${patronymic} `
      return fio || 'Введите имя'
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

<style></style>
