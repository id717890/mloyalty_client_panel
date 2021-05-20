<template>
  <div>
    <MlHeaderPage back-url="/dashboard/history" :title="'Чек #' + order.id" />
    <div class="px-11">
      <!-- <div class="ml-text-13-18 my-8">Номер чека: {{ order.id }}</div> -->
      <div>
        <div
          v-for="(item, index) in orderItems"
          :key="item.id"
          class="ml-order-detail-position"
        >
          <div class="ml-text-15-22 pr-2">{{ index + 1 }}.</div>
          <div>
            <div class="ml-text-15-22 mb-2">
              {{ item.name || item.id }}
            </div>
            <div class="ml-text-13-18 mb-2">
              {{ item.price }} ₽ × {{ item.count }} = {{ item.sum }} ₽
            </div>
            <div>
              <span
                v-if="item.bonus"
                class="ml-text-green1 ml-text-13-18-500 mr-3"
              >
                +{{ item.bonus }} Б
              </span>
              <span v-if="item.bonusUse" class="ml-text-red1 ml-text-13-18-500">
                -{{ item.bonusUse }} Б
              </span>
            </div>
            <div v-if="item.discount" class="mb-1 mt-1">
              <span class="pr-2">
                <img src="~/static/image/procent.svg" alt="" />
              </span>
              <span class="ml-text-13-18">
                Применена скидка — {{ item.discount }} ₽
              </span>
            </div>
            <div v-if="item.coupon">
              <span class="">
                <img src="~/static/image/cut.svg" alt="" />
              </span>
              <span class="ml-text-13-18">
                Применен купон {{ item.coupon }}</span
              >
            </div>
          </div>
        </div>

        <!-- <div class="ml-order-detail-position">
        <div class="ml-text-15-22 pr-2">01.</div>
        <div>
          <div class="ml-text-15-22 mb-2">
            Велосипед Спортивный, двухколёсный, очень быстрый, с педалями
          </div>
          <div class="ml-text-13-18 mb-2">3221.00 ₽ × 1 = 32210.00 ₽</div>
          <div>
            <span class="ml-text-green1 ml-text-13-18-500">+11 202 Б</span>
            <span class="ml-text-red1 ml-text-13-18-500">-13 021 Б</span>
          </div>
        </div>
      </div>
      <div class="ml-order-detail-position">
        <div class="ml-text-15-22 pr-2">02.</div>
        <div>
          <div class="ml-text-15-22 mb-2">
            Велосипед Спортивный, двухколёсный, очень быстрый, с педалями
          </div>
          <div class="ml-text-13-18 mb-2">3221.00 ₽ × 1 = 32210.00 ₽</div>
          <div class="mb-2">
            <span class="ml-text-green1 ml-text-13-18-500">+11 202 Б</span>
            <span class="ml-text-red1 ml-text-13-18-500">-13 021 Б</span>
          </div>
          <div class="mb-1">
            <span class="pr-2">
              <img src="~/static/image/procent.svg" alt="" />
            </span>
            <span class="ml-text-13-18"> Применена скидка — 500 ₽ </span>
          </div>
          <div>
            <span class="">
              <img src="~/static/image/cut.svg" alt="" />
            </span>
            <span class="ml-text-13-18"> Применен купон MAY_2021</span>
          </div>
        </div>
      </div>
      <div class="ml-order-detail-position">
        <div class="ml-text-15-22 pr-2">03.</div>
        <div>
          <div class="ml-text-15-22 mb-2">
            Велосипед Спортивный, двухколёсный, очень быстрый, с педалями
          </div>
          <div class="ml-text-13-18 mb-2">3221.00 ₽ × 1 = 32210.00 ₽</div>
          <div>
            <span class="ml-text-green1 ml-text-13-18-500">+11 202 Б</span>
            <span class="ml-text-red1 ml-text-13-18-500">-13 021 Б</span>
          </div>
        </div>
      </div>
      <div class="ml-order-detail-position">
        <div class="ml-text-15-22 pr-2">04.</div>
        <div>
          <div class="ml-text-15-22 mb-2">
            Велосипед Спортивный, двухколёсный, очень быстрый, с педалями
          </div>
          <div class="ml-text-13-18 mb-2">3221.00 ₽ × 1 = 32210.00 ₽</div>
          <div class="mb-2">
            <span class="ml-text-green1 ml-text-13-18-500">+11 202 Б</span>
            <span class="ml-text-red1 ml-text-13-18-500">-13 021 Б</span>
          </div>
          <div class="mb-1">
            <span class="pr-2">
              <img src="~/static/image/procent.svg" alt="" />
            </span>
            <span class="ml-text-13-18"> Применена скидка — 500 ₽ </span>
          </div>
          <div>
            <span class="">
              <img src="~/static/image/cut.svg" alt="" />
            </span>
            <span class="ml-text-13-18"> Применен купон MAY_2021</span>
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuid } from 'uuid'

export default {
  layout: 'dashboard',
  computed: {
    ...mapGetters('client', ['allOrdersAndBonuses']),
    order() {
      return this.allOrdersAndBonuses?.find(
        (order) => order.id === Number(this.$route?.params?.id)
      )
    },
    orderItems() {
      let result = []
      const items = this.order?.items
      if (items) {
        result = items.map((item) => {
          const itemMapped = {
            id: uuid(),
            name: item?.Name || item?.Code,
            price: item?.Price,
            count: item?.Qty,
            sum: item?.Amount + item?.Discount,
            bonus: item?.AddedBonus,
            bonusUse: item?.RedeemedBonus,
            discount: item?.Discount,
            coupon: item?.Coupon,
          }
          return itemMapped
        })
      }

      return result
    },
  },
}
</script>
