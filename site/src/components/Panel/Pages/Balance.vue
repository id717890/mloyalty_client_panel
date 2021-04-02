<template>
  <div class="h100 d-flex flex-column mloyalty-panel-burger-body">
    <div v-if="!isSent" class="flex-grow-1">
      <div class="row px-8 pt-5 text-left">
        <div class="col-12 py-0">
          <div class="ml-text-20-32-600 mb-3">Проверка баланса</div>
        </div>
        <div class="col-12  py-0">
          <span class="ml-title-14-20"
            >Введите последние 4 цифры номера сертификата</span
          >
          <MlInputCode4 @change="numberOfCertificate = $event" />
        </div>
        <div class="col-12 py-0">
          <span class="ml-title-14-20">Введите ПИН код</span>
          <MlInputCode4 @change="pincode = $event" />
        </div>
        <div class="col-12 py-0">
          <span class="ml-title-14-20">Введите номер телефона</span>
          <v-text-field
            color="dark"
            prepend-inner-icon="+7"
            append-icon="mdi-check"
            v-mask="'(###) ###-##-##'"
            required
            height="60"
            label="Ваш телефон*"
            :rules="phoneRules"
            class="ml-input ml-input-prepend-inner mt-2 ml-hide-details"
            :class="{ novalidate: validatePhone === false }"
            outlined
            autocomplete="off"
            v-model="phone"
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
        <div class="col-12 pt-0">
          <verification-code
            @success="successVerificationProcess"
            v-if="isSentVerificationCode && !successVerification"
            :type="verificationType"
          >
            <template #text>
              <div class="col-12 text2">
                После подтверждения номера телефона мы отобразим полную
                информацию о подарочном сертификате
              </div>
            </template>
          </verification-code>
          <template v-if="successVerification">
            <div class="col-12 px-0 pt-0">
              <v-icon class="success-message">mdi-check-circle</v-icon>
              <span class="ml-2">Номер подтвержден!</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div
      v-if="isLoading"
      class="d-flex flex-grow-1 align-items-center justify-content-center"
    >
      <MlLoading />
    </div>
    <div v-if="isShowBalance" class="flex-grow-1">
      <div class="row pb">
        <div class="col-12 py-0 pt-2">
          <div class="ml-title1-24-32-600 pb-9">Баланс сертификата</div>
        </div>
        <div class="col-12 py-0">
          <div class="ml-title2-40-32-600">{{ getRandom() }} ₽</div>
        </div>
        <div class="col-12">
          <div class="ml-title3-14-24">{{ today }}</div>
        </div>
        <div class="mloyalty-preview-cert-body mt-9 pb-8">
          <div class="col-12 pa-0 text-center">
            <span
              style="position:relative; top:-14px; padding: 0 10px; background: white"
              class="ml-title3-14-24"
              >СЕРТИФИКАТ</span
            >
          </div>
          <div class="col-12 text-center">
            <img src="@/assets/img/example/riv-gosh.png" class=" mb-3" alt="" />
            <div class="mloyalty-preview-title mb-2">
              Сертификат на 3000 ₽ <br />
              «РивГош»
            </div>
            <div class="mloyalty-preview-expiration">
              Действует до 29.04.2020
            </div>
            <div
              class="mloyalty-preview-congratulation px-10 mt-6 text-justify"
            >
              <div class="text-center">С днем рождения!</div>
              Желаю крепкого здоровья, удачи, благополучия, добра, радости,
              любви, счастья, хорошего настроения, улыбок, ярких впечатлений.
              Пусть тепло и уют всегда наполняют твой дом, пусть солнечный свет
              согревает в любую погоду, при одной мысли о них.
            </div>
          </div>
        </div>
        <div class="col-12 pt-0 text-center">
          <img
            src="@/assets/img/example/riv-gosh-card.png"
            class="mb-4"
            alt=""
          />
          <img
            src="@/assets/img/example/riv-gosh-bar-code.png"
            class="mt-6"
            alt=""
          />
          <div class="mloyalty-preview-congratulation">
            Номер карты: 126324789743873
          </div>
          <div class="ml-title-4-18-32-500">
            PIN-код: 678 579
          </div>
        </div>
      </div>
    </div>
    <div class="controlls" v-if="!isShowBalance">
      <button
        :disabled="!successVerification"
        href="#"
        @click.prevent="getBalance"
        class="ml-black-btn w100"
      >
        Узнать баланс
      </button>
      <div class="ml-text-11-14 mt-2">
        Нажимая кнопку "Узнать баланс", я соглашаюсь с Правилами использования
        подарочных карт и сертификатов и Офертой.
      </div>
    </div>
  </div>
</template>

<script>
import MlInputCode4 from '@/components/UI/MlInputCode4'
import { mask } from 'vue-the-mask'
import { VERIFICATION_BY_SMS } from '@/helpers/const/sendingMethod'
import verificationCode from '@/components/Panel/VerificationCode'
import MlLoading from '@/components/UI/MlLoading'
import { format } from 'date-fns'

export default {
  directives: {
    mask
  },
  components: {
    MlInputCode4,
    verificationCode,
    MlLoading
  },
  data: () => ({
    isSent: true,
    isShowBalance: true,
    isLoading: false,
    numberOfCertificate: null,
    pincode: null,
    phone: null,
    successVerification: null,
    isSentVerificationCode: false,
    phoneRules: [v => !!v || 'Необходимо заполнить Телефон']
  }),
  computed: {
    today() {
      const date = format(new Date(), 'dd.MM.yyyy')
      return `По состоянию на ${date}`
    },
    verificationType() {
      return VERIFICATION_BY_SMS
    },
    validatePhone() {
      return this.phone?.length === 15
    }
  },
  methods: {
    getRandom() {
      return Math.round(Math.random() * (3000 - 200) + 200, 0)
    },
    getBalance() {
      this.isLoading = true
      this.isSent = true
      this.isShowBalance = false
      setTimeout(() => {
        this.isLoading = false
        this.isShowBalance = true
      }, 1000)
    },
    sendVerificationCode() {
      this.isSentVerificationCode = true
    },
    successVerificationProcess() {
      this.successVerification = true
    },
    resetForm() {
      this.isShowBalance = false
      this.isSent = false
      this.isLoading = false
      this.phone = null
      this.successVerification = null
    }
  },
  mounted() {
    this.resetForm()
  }
}
</script>
