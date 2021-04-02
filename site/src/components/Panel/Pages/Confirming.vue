<template>
  <div class="ml-panel-confirming-page h100 d-flex flex-column">
    <div class="pb flex-grow-1">
      <div class="row">
        <div class="col-12 pb-0">
          <div class="ml-title1-24-32-600 mb-3">Оформление</div>
        </div>
        <div class="col-12">
          <div class="ml-text-16-20 d-flex justify-content-between mb-3">
            <span>Всего сертификатов</span>
            <span>{{ allPositions.count }}</span>
          </div>
          <div class="ml-text-16-20 d-flex justify-content-between">
            <span>Общая стоимость</span>
            <span>{{ allPositions.price }}₽</span>
          </div>
        </div>
        <div class="col-12">
          <div class="text3">Контакты для отправки</div>
        </div>
        <div class="col-12 contacts">
          <div class="phone d-flex align-items-center">
            <span class="d-flex align-items-center">
              <template v-if="isTelegram">
                <v-icon class="ml-text-grey">mdi-telegram</v-icon>
                <span class="ml-text-16-24 ml-text-grey mx-2">Telegram: </span>
              </template>
              <template v-if="isWhatsApp">
                <v-icon class="ml-text-grey">mdi-whatsapp</v-icon>
                <span class="ml-text-grey ml-text-16-24  mx-2">WhatsApp: </span>
              </template>
              <template v-if="isViber">
                <img
                  src="~@/assets/img/default/send-method-viber-unselect3.svg"
                  width="20"
                  style="margin-left: 3px; transform: scale(1.1)"
                  alt=""
                />
                <span class="ml-text-grey ml-text-16-24  mx-2">Viber: </span>
              </template>
              <template v-if="isSms">
                <v-icon class="ml-text-grey"
                  >mdi-message-processing-outline</v-icon
                >
                <span class="ml-text-grey ml-text-16-24  mx-2">СМС: </span>
              </template>
            </span>
            <span class="ml-text-16-24 ml-text-black"
              >+7 {{ contacts.phone }}</span
            >
          </div>
          <div class="email d-flex align-items-center">
            <span>
              <v-icon class="ml-text-grey">mdi-email</v-icon>
              <span class="ml-text-grey ml-text-16-24  mx-2">E-mail: </span>
            </span>
            <span class="ml-text-16-24 ml-text-black">{{
              contacts.email
            }}</span>
          </div>
        </div>
        <div class="col-12 pb-0">
          <div class="text3 mt-5">Карта лояльности</div>
        </div>
        <div class="col-12 pt-1">
          <v-text-field
            color="dark"
            type="text"
            height="60"
            label="Номер карты лояльности"
            class="ml-input ml-hide-details"
            outlined
            autocomplete="off"
            v-model="loyaltyCard"
          ></v-text-field>
          <p class="ml-text-13-16">
            Чтобы получить бонусы за покупку сертификата укажите номер карты
            лояльности BeautyBonus
          </p>
        </div>
      </div>
    </div>
    <div class="controlls">
      <a href="#" @click.prevent="next" class="ml-black-btn">
        Оплатить {{ allPositions.price }} ₽
      </a>
      <p class="text4 mt-3 mb-0">
        Нажимая кнопку "Оплатить", я соглашаюсь с Правилами использования
        подарочных карт и сертификатов и Офертой.
      </p>
    </div>
  </div>
</template>

<script>
import { SUCCESS_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { mapGetters, mapMutations, mapState } from 'vuex'
import {
  SENDING_METHOD_TELEGRAM,
  SENDING_METHOD_WHATSAPP,
  SENDING_METHOD_VIBER,
  SENDING_METHOD_SMS
} from '@/helpers/const/sendingMethod'
import basketTypes from '@/store/basket/types'
import verificationTypes from '@/store/verificationCode/types'

export default {
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({
    loyaltyCard: null
  }),
  computed: {
    ...mapGetters('basket', ['allPositions']),
    ...mapState({
      contacts: state => state.verificationCode.contacts
    }),
    isTelegram() {
      return this.contacts?.sendingMethod === SENDING_METHOD_TELEGRAM
    },
    isWhatsApp() {
      return this.contacts?.sendingMethod === SENDING_METHOD_WHATSAPP
    },
    isViber() {
      return this.contacts?.sendingMethod === SENDING_METHOD_VIBER
    },
    isSms() {
      return this.contacts?.sendingMethod === SENDING_METHOD_SMS
    }
  },
  methods: {
    ...mapMutations('basket', [basketTypes.SET_BASKET]),
    ...mapMutations('verificationCode', [verificationTypes.SET_CONTACTS]),
    next() {
      this.changePanelPage(SUCCESS_PAGE)
      this[basketTypes.SET_BASKET](null)
      this[verificationTypes.SET_CONTACTS]({
        email: null,
        phone: null,
        sendingMethod: null
      })
    }
  }
}
</script>
