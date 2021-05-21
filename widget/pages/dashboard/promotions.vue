<template>
  <div>
    <MlHeaderPage title="Акции" />
    <MlLoading v-if="loading" class="pt-5" />
    <div v-else class="px-10 py-4 d-flex flex-column">
      <div
        v-for="item in promos"
        :key="item.id"
        :ref="'promo' + item.id"
        class="ml-promo-block mb-4"
      >
        <div class="ml-promo-block_img">
          <img :src="item.logo" alt="" />
        </div>
        <div class="ml-promo-block_title px-5 ml-text-18-22-900 pt-4 pb-1">
          {{ item.tagline }}
        </div>
        <div class="ml-promo-block_subtitle px-5 ml-text-13-16-700 pb-4">
          {{ item.condition }}
        </div>
        <div
          :ref="'promo-text' + item.id"
          class="ml-promo-block_text ml-text-14-22 mx-5 pt-4"
        >
          <pre
            class="ml-text-14-22 ml-opacity-07"
            style="white-space: pre-line"
          >
            {{ item.description }}
          </pre>
        </div>
        <div class="px-5 mb-3 ml-promo-open">
          <a
            href="#"
            class="ml-text-13-22 ml-opacity-07 ml-text-grey3 d-flex align-items-center mb-2"
            @click.prevent="toggleDetails(item.id)"
          >
            Подробнее
            <img
              src="/image/arrow-right.png"
              class="ml-2"
              style="margin-top: 2px"
              alt=""
            />
          </a>
        </div>
        <div class="px-5 text-right mb-3 ml-promo-close">
          <v-btn
            text
            icon
            class="ml-promo-arrow-btn"
            @click="toggleDetails(item.id)"
          >
            <img src="/image/arrow-up.svg" class="" alt="" />
            <!-- <img src="/image/arrow-down.svg" class="ml-promo-open" alt="" /> -->
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import otherTypes from '~/store/other/types'

export default {
  layout: 'dashboard',
  data: () => ({
    loading: false,
    items: [
      {
        id: 1,
        img: '/image/example/promo1.png',
        size: 'hd',
        title: 'Скидка 30% на первый заказ',
        subtitle: 'За любую покупку от 1000 рублей',
        text:
          'Купи 2 пиццы на сумму от 2000 рублей и получи дополнительно 500 бонусов! Их нужно потратить до 14 февраля иначе они сгорят! Спешите, ждем Вас!',
      },
      {
        id: 2,
        img: '/image/example/promo2.png',
        size: 'sm',
        title: 'Скидка 30% на первый заказ',
        subtitle: 'За любую покупку от 1000 рублей',
        text:
          'Купи 3 пиццы на сумму от 3000 рублей и получи дополнительно 900 бонусов! Их нужно потратить до 14 февраля иначе они сгорят! Спешите, ждем Вас!',
      },
    ],
  }),
  computed: {
    ...mapState({
      promos: (state) => state?.other?.promo,
    }),
  },
  async mounted() {
    this.loading = true
    await this[otherTypes.GET_PROMO_ACTION]()
    this.loading = false
  },
  methods: {
    ...mapActions('other', [otherTypes.GET_PROMO_ACTION]),
    toggleDetails(id) {
      const elPromo = this.$refs['promo' + id][0]
      elPromo.classList.toggle('active')
      const elPromoText = this.$refs['promo-text' + id][0]
      console.log(elPromoText)
      if (elPromoText.style.maxHeight) {
        elPromoText.style.maxHeight = null
        setTimeout(() => {
          elPromoText.style.display = 'none'
        }, 125)
      } else {
        elPromoText.style.display = 'block'
        elPromoText.style.maxHeight = elPromoText.scrollHeight + 10 + 'px'
      }
    },
  },
}
</script>

<style lang="scss">
.ml-promo-block {
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  flex-flow: column;
  background-color: white;

  .ml-promo-open {
    display: block;
  }

  .ml-promo-close {
    display: none;
  }

  .ml-promo-block_img {
    width: 100%;

    img {
      width: 100%;
    }
  }

  .ml-promo-block_img_sm {
    padding: 23px 19px 0;

    img {
      width: auto !important;
    }
  }

  .ml-promo-block_text {
    display: none;
    max-height: 0;
    // height: 0;
    overflow: hidden;
    transition: all 0.2s ease-out;
  }
}

.ml-promo-arrow-btn {
  background-color: #f5f7f9;
}

.ml-promo-block.active {
  .ml-promo-block_text {
    border-top: 1px solid #e6e6e6;
  }

  .ml-promo-open {
    display: none;
  }

  .ml-promo-close {
    display: block;
  }
}
</style>
