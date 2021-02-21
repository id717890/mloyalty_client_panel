<template>
  <div>
    <div class="">
      <p class="ml-text-16-24-600 mb-6">Введите код подтверждения</p>
    </div>
    <div class="d-flex align-center mb-6">
      <MlInputCode
        ref="code1"
        v-model="number1OfCode"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber1"
      />
      <MlInputCode
        ref="code2"
        v-model="number2OfCode"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber2"
      />
      <MlInputCode
        ref="code3"
        v-model="number3OfCode"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber3"
      />
      <MlInputCode
        ref="code4"
        v-model="number4OfCode"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber4"
      />

      <v-progress-circular
        v-if="processVerificationCode"
        indeterminate
        class="ml-2"
        width="2"
        color="#000000"
      ></v-progress-circular>
    </div>
    <div v-if="invalidCode" class="ml-error-text ml-title-14-20 mb-6">
      Введён неверный код подтверждения
    </div>
    <div v-if="isSms" class="ml-title-14-20">
      Код подтверждения отправлен Вам в смс
    </div>
    <div v-if="isMessenger" class="ml-title-14-20">
      Ссылка для получения кода подтверждения в Telegram, отправлена Вам в смс.
      Перейдите по ссылке и получите код подтверждения.
    </div>
    <slot name="text"> </slot>
    <div v-if="!showResendBtn" class="text-center ml-title-14-20 mt-6">
      {{ timerForResendText }}
    </div>
    <div v-if="showResendBtn" class="text-center ml-title-14-20 mt-6">
      <a href="#" @click.prevent="startTimerForResend(true)">
        Отправить повторно
      </a>
    </div>
  </div>
</template>

<script>
import MlInputCode from '@/components/UI/MlInputCode'
import { mapActions, mapState } from 'vuex'
import verifyTypes from '@/store/verify/types'
import { debounce } from 'lodash'

const TIMER_SECONDS = 10
const DEFAULT_COMMUNICATION_TYPE = 1

export default {
  components: {
    MlInputCode,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    timerForResend: {
      seconds: TIMER_SECONDS,
      id: null,
    },
    successVerification: null,
    showResendBtn: false,
    number1OfCode: null,
    number2OfCode: null,
    number3OfCode: null,
    number4OfCode: null,
  }),
  computed: {
    ...mapState({
      processVerificationCode: (state) => state.verify.isInitCodeInProccess,
    }),
    timerForResendText() {
      return `Отправить повторно можно через ${this.timerForResend.seconds}с`
    },
    invalidCode() {
      return this.successVerification === false
    },
    isSms() {
      return this.type === 'VERIFICATION_BY_SMS'
    },
    isMessenger() {
      return this.type === 'VERIFICATION_BY_MESSENGER'
    },
    clearPhone() {
      return this.phone
        ?.replaceAll(' ', '')
        .replaceAll('(', '')
        .replaceAll(')', '')
        .replaceAll('-', '')
    },
  },
  created() {
    const debounceTimeout = process.env.VUE_APP_DEBOUNCE_TIMEOUT ?? 1000
    this.debounced = {
      sendVerificationCodeViaSms: debounce(
        this.sendVerificationCodeViaSms,
        debounceTimeout
      ),
      sendVerificationCodeViaMessanger: debounce(
        this.sendVerificationCodeViaMessanger,
        debounceTimeout
      ),
    }
    this.startTimerForResend(false)
  },
  mounted() {
    this.$refs?.code1?.$el?.focus()
  },
  methods: {
    ...mapActions('verify', [
      verifyTypes.SEND_VERIFICATIONCODE_VIA_SMS,
      verifyTypes.REQUEST_CODE,
    ]),
    resetCode() {
      this.number1OfCode = null
      this.number2OfCode = null
      this.number3OfCode = null
      this.number4OfCode = null
      this.successVerification = null
    },
    startTimerForResend(isResend = true) {
      if (isResend === true) {
        this.showResendBtn = false
        this.resetCode()
        const phone = this.clearPhone
        const communicationType = DEFAULT_COMMUNICATION_TYPE
        this[verifyTypes.REQUEST_CODE]({
          phone,
          communicationType,
        }).then(() => {
          this.timerForResend.seconds = TIMER_SECONDS
          this.timerForResend.id = setInterval(this.timerForResending, 1000)
        })
      } else {
        this.showResendBtn = false
        this.timerForResend.seconds = TIMER_SECONDS
        this.timerForResend.id = setInterval(this.timerForResending, 1000)
      }
    },
    timerForResending() {
      if (this.timerForResend.seconds !== 1) {
        this.timerForResend.seconds -= 1
      } else {
        clearInterval(this.timerForResend.id)
        this.showResendBtn = true
      }
    },
    sendVerificationCodeViaSms(code) {
      this[verifyTypes.SEND_VERIFICATIONCODE_VIA_SMS]({
        code,
        phone: this.clearPhone,
      }).then((result) => {
        this.successVerification = result
        if (result === true) {
          this.$emit('success')
        } else {
          setTimeout(() => {
            this.resetCode()
            this.$refs?.code1?.$el?.focus()
          }, 2000)
        }
      })
    },
    sendVerificationCodeViaMessanger(code) {
      this[verifyTypes.SEND_VERIFICATIONCODE_VIA_MESSANGER]({
        code,
        phone: this.clearPhone,
      }).then((result) => {
        this.successVerification = result
        if (result === true) this.$emit('success')
      })
    },
    proccessNumber1() {
      this.successVerification = null
      this.number2OfCode = null
      this.number3OfCode = null
      this.number4OfCode = null
      if (
        this.number1OfCode &&
        Number.isInteger(parseInt(this.number1OfCode))
      ) {
        this.$refs.code2.$el.focus()
      }
    },
    proccessNumber2() {
      this.successVerification = null
      this.number3OfCode = null
      this.number4OfCode = null
      if (
        this.number2OfCode &&
        Number.isInteger(parseInt(this.number2OfCode))
      ) {
        this.$refs.code3.$el.focus()
      }
    },
    proccessNumber3() {
      this.successVerification = null
      this.number4OfCode = null
      if (
        this.number3OfCode &&
        Number.isInteger(parseInt(this.number3OfCode))
      ) {
        this.$refs.code4.$el.focus()
      }
    },
    proccessNumber4() {
      this.successVerification = null
      this.$refs.code4.$el.blur()
      if (
        this.number4OfCode &&
        Number.isInteger(parseInt(this.number4OfCode))
      ) {
        const code1 = this.number1OfCode
        const code2 = this.number2OfCode
        const code3 = this.number3OfCode
        const code4 = this.number4OfCode
        if (code1 && code2 && code3 && code4) {
          const code = `${code1}${code2}${code3}${code4}`
          if (this.isSms) {
            this.debounced.sendVerificationCodeViaSms(code)
          } else {
            this.debounced.sendVerificationCodeViaMessanger(code)
          }
        }
      }
    },
  },
}
</script>
