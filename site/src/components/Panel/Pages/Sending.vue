<template>
  <div class="ml-panel-sending-page">
    <div class="row">
      <div class="col-12">
        <div class="pb">
          <div class="row">
            <div class="col-12 pt-0"><div class="section">Отправка</div></div>
          </div>
          <div class="row">
            <div class="col-12">
              <v-text-field
                color="dark"
                append-icon="mdi-check"
                type="email"
                required
                :rules="emailRules"
                height="60"
                label="Ваш e-mail*"
                class="ml-input"
                autocomplete="off"
                :class="{ novalidate: validateEmail === false }"
                outlined
                v-model="form.email"
              ></v-text-field>
              <div class="ml-input-noty">
                E-mail нужен для оперативного ответа службы тех. поддержки в
                случае неуспешной отправки сертификата.
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="text1">Выберите, как вам отправить сертификат(ы)</div>
              <div class="ml-input-noty">
                Сообщение со ссылкой на сертификат(ы) будет отправлено вам по
                мессенджеру или в sms. После его получения вы сможете переслать
                его кому угодно.
              </div>
            </div>
            <div class="col-12 d-flex">
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodTelegram }"
                @click.prevent="form.sendingMethod = 'telegram'"
              >
                <v-icon>mdi-telegram</v-icon>
              </a>
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodWhatsApp }"
                @click.prevent="form.sendingMethod = 'whatsapp'"
              >
                <v-icon>mdi-whatsapp</v-icon>
              </a>
              <a
                href="#"
                class="ml-sending-method-btn mr-2"
                :class="{ active: isSendingMethodViber }"
                @click.prevent="form.sendingMethod = 'viber'"
              >
                <img
                  src="~@/assets/img/default/send-method-viber-select3.svg"
                  v-if="isSendingMethodViber"
                  style="transform: scale(1.3)"
                  alt=""
                />
                <img
                  v-else
                  src="~@/assets/img/default/send-method-viber-unselect3.svg"
                  style="transform: scale(1.3)"
                  alt=""
                />

                <!-- <img src="~@/assets/img/default/send-method-viber.png" alt="" /> -->
              </a>
              <a
                href="#"
                class="ml-sending-method-btn"
                :class="{ active: isSendingMethodSms }"
                @click.prevent="form.sendingMethod = 'sms'"
              >
                <v-icon>mdi-message-processing-outline</v-icon>
              </a>
            </div>
          </div>
          <div class="row" v-if="isShowPhone">
            <div class="col-12 d-flex flex-column pb-0">
              <v-text-field
                autocomplete="off"
                color="dark"
                prepend-inner-icon="+7"
                append-icon="mdi-check"
                v-mask="'(###) ###-##-##'"
                required
                height="60"
                label="Ваш телефон*"
                class="ml-input ml-input-prepend-inner"
                :class="{ novalidate: validatePhone === false }"
                outlined
                v-model="form.phone"
              ></v-text-field>
              <button
                v-if="!successVerification && !isSentVerificationCode"
                :disabled="!validatePhone"
                href="#"
                class="ml-black-btn w100"
                @click.stop="sendVerificationCode"
              >
                Подтвердить
              </button>
            </div>
          </div>
          <verification-code
            @success="successVerificationProcess"
            v-if="isSentVerificationCode && !successVerification"
            :type="verificationType"
          />
          <template v-if="successVerification">
            <div class="col-12 px-0 pt-0">
              <v-icon class="success-message">mdi-check-circle</v-icon>
              <span class="ml-2">Номер подтвержден!</span>
            </div>
            <div class="col-12 px-0">
              <button
                :disabled="!validateForm"
                href="#"
                @click.prevent="nextPage"
                class="ml-silver-btn"
                style="width: 100%"
              >
                Продолжить оформление
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { CONFIRMING_PAGE } from '@/helpers/const/widgetPage'
import {
  SENDING_METHOD_TELEGRAM,
  SENDING_METHOD_WHATSAPP,
  SENDING_METHOD_VIBER,
  SENDING_METHOD_SMS,
  VERIFICATION_BY_SMS,
  VERIFICATION_BY_MESSENGER
} from '@/helpers/const/sendingMethod'
import panelTypes from '@/store/panel/types'
import verificationTypes from '@/store/verificationCode/types'
import { mask } from 'vue-the-mask'
import verificationCode from '@/components/Panel/VerificationCode'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  directives: { mask },
  components: {
    verificationCode
  },
  mixins: [MixinChangePanelPage],
  data: () => ({
    form: {
      email: null,
      phone: null,
      sendingMethod: null
    },
    successVerification: null,
    isSentVerificationCode: false,
    emailRules: [
      v => !!v || 'Необходимо заполнить e-mail',
      v => /.+@.+/.test(v) || 'Введен некорректный e-mail'
    ]
  }),
  computed: {
    validateForm() {
      return this.validateEmail && this.validatePhone
    },
    verificationType() {
      return this.form.sendingMethod === SENDING_METHOD_SMS
        ? VERIFICATION_BY_SMS
        : VERIFICATION_BY_MESSENGER
    },
    isShowPhone() {
      return this.form.sendingMethod === null ? false : true
    },
    validateEmail() {
      return /.+@.+/.test(this.form.email)
    },
    validatePhone() {
      return this.form?.phone?.length === 15
    },
    isSendingMethodTelegram() {
      return this.form.sendingMethod === SENDING_METHOD_TELEGRAM
    },
    isSendingMethodWhatsApp() {
      return this.form.sendingMethod === SENDING_METHOD_WHATSAPP
    },
    isSendingMethodViber() {
      return this.form.sendingMethod === SENDING_METHOD_VIBER
    },
    isSendingMethodSms() {
      return this.form.sendingMethod === SENDING_METHOD_SMS
    }
  },
  methods: {
    ...mapMutations('verificationCode', [verificationTypes.SET_CONTACTS]),
    successVerificationProcess() {
      this.successVerification = true
      this[verificationTypes.SET_CONTACTS](this.form)
    },
    sendVerificationCode() {
      this.isSentVerificationCode = true
    },
    isSendingMethod(value) {
      return value === this.sendingMethod
    },
    nextPage() {
      this.changePanelPage(CONFIRMING_PAGE)
    }
    // preventNumericInput($event) {
    //   console.log($event.keyCode) //will display the keyCode value

    //   var keyCode = $event.keyCode ? $event.keyCode : $event.which
    //   if (keyCode > 47 && keyCode < 58) {
    //   } else {
    //     $event.preventDefault()
    //   }
    // },
    // inputPhone() {
    //   this.form.phone = this.maskedPhone(this.form.phone)
    // },
    // maskedPhone(text) {
    //   let result = ''
    //   if (!text.length) return text
    //   if (text.length > 0 && text.length <= 3) {
    //     result = `(${text})`
    //   } else if (text.length > 3 && text.length <= 6) {
    //     result = `(${text.substring(0, 3)}) ${text.substring(3)}`
    //   } else if (text.length > 6 && text.length <= 8) {
    //     result = `(${text.substring(0, 3)}) ${text.substring(
    //       3,
    //       6
    //     )} - ${text.substring(6)}`
    //   } else if (text.length > 8) {
    //     result = `(${text.substring(0, 3)}) ${text.substring(
    //       3,
    //       6
    //     )} - ${text.substring(6, 8)} - ${text.substring(8)}`
    //   }
    //   if (result.length > 10) result = result.substring(0, 19)
    //   return result
    // }
  }
}
</script>
