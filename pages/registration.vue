<template>
  <div class="px-8">
    <div class="ml-text-16-24-600 mt-12 mb-2">Подтвердите номер телефона</div>
    <div class="ml-title-14-20 mb-6">
      Для регистрации в программе лояльности Вам необходимо подтвердить номер
      своего телефона
    </div>
    <div>
      <v-text-field
        ref="phone"
        v-model="phone"
        v-mask="'(###) ###-##-##'"
        autocomplete="off"
        color="dark"
        prepend-inner-icon="+7"
        append-icon="mdi-check"
        required
        height="60"
        label="Ваш телефон*"
        class="ml-input ml-input-prepend-inner 12345"
        :class="{ novalidate: validatePhone === false }"
        outlined
        :disabled="isSentVerificationCode"
        @keydown.enter="requestCode"
      ></v-text-field>
    </div>
    <div>
      <button
        :disabled="!validatePhone"
        class="ml-black-btn w100"
        @click="requestCode"
      >
        Подтвердить
      </button>
    </div>
    <div>
      <verification-code
        v-if="isSentVerificationCode && !successVerification"
        :type="verificationType"
        :phone="phone"
        @success="successVerificationProcess"
      >
        <template #text>
          <div class="col-12 text2">
            После подтверждения номера телефона мы отобразим полную информацию о
            подарочном сертификате
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
</template>

<script>
import { mask } from 'vue-the-mask'
import verifyTypes from '@/store/verify/types'
import verificationCode from '@/components/VerificationCode'
import { mapActions } from 'vuex'

const COMMUNICATION_TYPE = 1

export default {
  directives: {
    mask,
  },
  components: {
    verificationCode,
  },
  layout: 'default',
  data: () => ({
    phone: 9224870500,
    isSentVerificationCode: false, // Признак того что отправили код, т.е. нажали на кнопку "Подтвердить"
    successVerification: false,
  }),
  computed: {
    validatePhone() {
      return this.phone?.length === 15
    },
    clearPhone() {
      return this.phone
        ?.replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
    },
  },
  methods: {
    ...mapActions('verify', [verifyTypes.REQUEST_CODE]),
    requestCode() {
      const phone = this.clearPhone
      const communicationtype = COMMUNICATION_TYPE
      this[verifyTypes.REQUEST_CODE]({
        phone,
        communicationtype,
      }).then(() => (this.isSentVerificationCode = true))
    },
  },
}
</script>
