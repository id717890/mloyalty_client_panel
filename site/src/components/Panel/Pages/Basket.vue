<template>
  <div class="ml-panel-basket-page h100">
    <div
      class="d-flex flex-column align-center justify-center h100"
      v-if="!basket || !basket.length"
    >
      <img src="~@/assets/img/empty-cart.png" alt="" class="empty-cart-img" />
      <section class="empty-text">
        <div>Ваша корзина пока пуста.</div>
        <div>Добавьте первый сертификат</div>
      </section>
      <a href="#" @click.prevent="addCertificate" class="ml-black-btn">
        <v-icon>mdi-plus</v-icon>
        Добавить сертификат
      </a>
    </div>
    <div class="h100 d-flex flex-column" v-else>
      <div class="pb flex-grow-1">
        <div class="row">
          <div class="col-12">
            <div class="section">Корзина</div>
          </div>
        </div>
        <template v-for="(item, itemIndex) in basket">
          <the-basket-item
            :ref="'the-basket-item-' + itemIndex"
            :key="itemIndex"
            :index="itemIndex"
            :certificate="item"
          />
        </template>

        <div class="row">
          <div class="col-12 basket-total">
            <div class="text1">Общая стоимость</div>
            <div class="text1">{{ allPositions.price }}₽</div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <a href="#" @click.prevent="addCertificate" class="ml-silver-btn">
              <v-icon>mdi-plus</v-icon>
              Добавить еще сертификат
            </a>
          </div>
        </div>
      </div>
      <div
        class="pb flex-grow-1"
        style="border-top: 1px solid #E6E6E6"
        v-if="!isVerified"
      >
        <div class="section">Контакты для отправки</div>
        <div class="text2">
          Укажите ваши контакты, чтобы мы могли отправить на них сообщение со
          ссылкой на сертификаты(ы). После получения сообщения вы сможете
          переслать его кому угодно.
        </div>
      </div>
      <div class="controlls">
        <a
          v-if="!isVerified"
          href="#"
          @click.prevent="goToSending"
          class="ml-black-btn"
        >
          Указать контакты для отправки
        </a>
        <a v-else href="#" @click.prevent="goToConfirming" class="ml-black-btn">
          Перейти к оформлению
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import {
  START_PAGE,
  CONFIRMING_PAGE,
  SENDING_PAGE
} from '@/helpers/const/widgetPage'
import { mapGetters, mapMutations, mapState } from 'vuex'
import TheBasketItem from '@/components/Panel/TheBasketItem'

export default {
  mixins: [MixinChangePanelPage],
  components: {
    TheBasketItem
  },
  computed: {
    ...mapState({
      basket: state => state.basket.basket
    }),
    ...mapGetters('basket', ['allPositions']),
    ...mapGetters(['verificationCode/isVerified']),
    isVerified() {
      return this['verificationCode/isVerified']
    }
  },
  watch: {
    basket() {
      Object.keys(this.$refs).forEach(key => {
        const el = this.$refs[key][0]
        if (el) el.$forceUpdate()
      })
    }
  },
  methods: {
    goToConfirming() {
      this.changePanelPage(CONFIRMING_PAGE)
    },
    goToSending() {
      this.changePanelPage(SENDING_PAGE)
    },
    addCertificate() {
      this.changePanelPage(START_PAGE)
    }
  }
}
</script>
