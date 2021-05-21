<template>
  <div
    v-if="loading"
    class="d-flex flex-column justify-content-center align-items-center flex-grow-1"
  >
    <MlLoading />
  </div>
  <div v-else class="px-8">
    <div class="ml-text-24-24-600 mt-12 mb-2">Вход в личный кабинет</div>
    <div class="ml-title-14-20 mb-6">
      Для авторизации в личном кабинете Вам необходимо подтвердить номер своего
      телефона смс-кодом
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
        v-if="!successVerification && !isSentVerificationCode"
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
        :phone="phone"
        :type="channelType"
        :code-type="smsCodeType"
        @success="successVerificationProcess"
      >
        <template #text>
          <div class="ml-title-14-20">
            Вводя смс-код вы соглашаетесь с
            <a href="#" @click.prevent="openRules"
              ><u>правилами программы</u></a
            >
          </div>
        </template>
      </verification-code>
      <template v-if="successVerification">
        <div class="col-12 px-0 pt-0">
          <v-icon class="ml-success-text">mdi-check-circle</v-icon>
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
import { mapActions, mapMutations, mapState, mapGetters } from 'vuex'
import clientTypes from '~/store/client/types'
import Constants from '~/helpers/constants'

const COMMUNICATION_TYPE = 1

export default {
  directives: {
    mask,
  },
  components: {
    verificationCode,
  },
  layout: 'default',
  // middleware: ['jwtauth'],
  data: () => ({
    loading: false,
    // phone: 9224870500,
    phone: null,
    isSentVerificationCode: false, // Признак того что отправили код, т.е. нажали на кнопку "Подтвердить"
    successVerification: false,
  }),
  computed: {
    ...mapGetters('app', ['getClientMloyalty']),
    ...mapState({
      testMode: (state) => state?.app?.testMode,
      rulesUrl: (state) => state?.app?.mainWidgetConfig?.Rules?.Url,
      buffer: (state) => state?.verify?.buffer,
    }),
    channelType() {
      return Constants?.SEND_METHOD?.SMS?.COMMUNICATION_TYPE // = 1
    },
    smsCodeType() {
      return Constants?.SMS_CODE_TYPE?.SERT_BUYER // CodeType = 1
    },
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
  async mounted() {
    await this.setInitialize()
  },
  methods: {
    ...mapActions('verify', [verifyTypes.REQUEST_CODE]),
    ...mapActions('client', [
      clientTypes.CLIENT_CREATE_ISHOP_ACTION,
      clientTypes.CLIENT_CREATE_ACTION_2,
    ]),
    ...mapMutations('verify', [verifyTypes.SET_PHONE, verifyTypes.SET_BUFFER]),
    openRules() {
      this[verifyTypes.SET_BUFFER]({
        phone: this.phone,
        isSentVerificationCode: this.isSentVerificationCode,
      })
      this.$router.push({
        name: 'rules',
        params: { backUrl: '/' },
      })
      // window.open(this.rulesUrl, '_blank')
    },
    async setInitialize() {
      this.loading = true
      console.log(this.getClientMloyalty)
      if (this.getClientMloyalty) {
        await this[clientTypes.CLIENT_CREATE_ISHOP_ACTION]()
        this.$router.push({ name: 'dashboard' })
      } else {
        // this.phone = this.testMode ? 9224870500 : null
        this.phone = this.testMode ? 9527247500 : null
        const bufferPhone = this.buffer?.phone
        const bufferIsSentVerificationCode = this.buffer?.isSentVerificationCode

        if (bufferPhone) {
          this.phone = bufferPhone
        }
        if (bufferIsSentVerificationCode) {
          this.isSentVerificationCode = bufferIsSentVerificationCode
        }
        this.loading = false
        this.$nextTick(() => {
          this.$refs?.phone?.focus()
        })
      }
    },
    requestCode() {
      const phone = this.clearPhone
      const communicationtype = COMMUNICATION_TYPE
      this[verifyTypes.REQUEST_CODE]({
        phone,
        communicationtype,
      }).then(() => (this.isSentVerificationCode = true))
    },
    async successVerificationProcess() {
      this.successVerification = true
      await this[verifyTypes.SET_PHONE](this.clearPhone)
      // await this[clientTypes.CLIENT_CREATE_ACTION_2](this.clearPhone)
      await this[clientTypes.CLIENT_CREATE_ISHOP_ACTION]()
      setTimeout(() => {
        this.$router.push({ name: 'dashboard' })
      }, 1250)
    },
  },
}
</script>
