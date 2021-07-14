<template>
  <div>
    <div class="">
      <p class="ml-text-16-24-600 mb-6">Введите код подтверждения</p>
    </div>
    <div
      class="d-flex align-center mb-6"
      :class="{ 'justify-content-center': justifyCenter }"
    >
      <MlInputCode
        ref="code1"
        v-model="number1OfCode"
        :istyle="istyle"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber1"
      />
      <MlInputCode
        ref="code2"
        v-model="number2OfCode"
        :invalid="invalidCode"
        :istyle="istyle"
        type="number"
        class="mr-2"
        @input="proccessNumber2"
      />
      <MlInputCode
        ref="code3"
        v-model="number3OfCode"
        :istyle="istyle"
        :invalid="invalidCode"
        type="number"
        class="mr-2"
        @input="proccessNumber3"
      />
      <MlInputCode
        ref="code4"
        v-model="number4OfCode"
        :istyle="istyle"
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
    <!-- <div class="ml-title-14-20">Код подтверждения отправлен Вам в смс</div> -->
    <!-- <div v-if="isMessenger" class="ml-title-14-20">
      Ссылка для получения кода подтверждения в Telegram, отправлена Вам в смс.
      Перейдите по ссылке и получите код подтверждения.
    </div> -->
    <slot name="title"></slot>
    <slot name="text"> </slot>
    <div v-if="!showResendBtn" class="text-center ml-title-14-20 mt-6">
      {{ timerForResendText }}
    </div>
    <div v-if="showResendBtn" class="text-center ml-title-14-20 mt-6">
      <a href="#" @click.prevent="startTimerForResend(true)">
        Отправить повторно
      </a>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import MlInputCode from '@/components/UI/MlInputCode'
import { mapActions, mapState } from 'vuex'
import verifyTypes from '@/store/verify/types'
import { debounce } from 'lodash'

const TIMER_SECONDS = 3
const DEFAULT_COMMUNICATION_TYPE = 1

export default {
  components: {
    MlInputCode,
  },
  props: {
    justifyCenter: {
      type: Boolean,
      default: false,
    },
    istyle: {
      type: String,
      default: 'ml-input-code',
    },
    type: {
      type: Number,
      required: true,
    },
    // 1 - подтверждение телефона при оформлении
    // 2 - код для проверки баланса
    codeType: {
      type: Number,
      required: false,
      default: null,
    },
    phone: {
      type: String,
      required: false,
      default: null,
    },
    email: {
      type: String,
      required: false,
      default: null,
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
    // isSms() {
    //   return this.type === 'VERIFICATION_BY_SMS'
    // },
    // isMessenger() {
    //   return this.type === 'VERIFICATION_BY_MESSENGER'
    // },
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
      sendVerificationCodeViaEmail: debounce(
        this.sendVerificationCodeViaEmail,
        debounceTimeout
      ),
      // sendVerificationCodeViaMessanger: debounce(
      //   this.sendVerificationCodeViaMessanger,
      //   debounceTimeout
      // ),
    }
    this.startTimerForResend(false)
  },
  mounted() {
    this.$refs?.code1?.$el?.focus()
  },
  methods: {
    ...mapActions('verify', [
      verifyTypes.SEND_VERIFICATIONCODE_VIA_SMS,
      verifyTypes.SEND_VERIFICATIONCODE_VIA_EMAIL,
      verifyTypes.REQUEST_CODE,
      verifyTypes.REQUEST_EMAIL_CODE,
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
        if (this.phone) this.requestPhoneCode()
        if (this.email) this.requestEmailCode()
      } else {
        this.showResendBtn = false
        this.timerForResend.seconds = TIMER_SECONDS
        this.timerForResend.id = setInterval(this.timerForResending, 1000)
      }
    },
    requestPhoneCode() {
      const phone = this.clearPhone
      const communicationType = DEFAULT_COMMUNICATION_TYPE
      const codeType = this.codeType
      this[verifyTypes.REQUEST_CODE]({
        phone,
        communicationType,
        codeType,
      }).then(() => {
        console.log('ok p')

        this.timerForResend.seconds = TIMER_SECONDS
        this.timerForResend.id = setInterval(this.timerForResending, 1000)
        this.$refs?.code1?.$el?.focus()
      })
    },
    requestEmailCode() {
      console.log('requestEmailCode')
      this[verifyTypes.REQUEST_EMAIL_CODE](this.email).then(() => {
        console.log('ok e')
        this.timerForResend.seconds = TIMER_SECONDS
        this.timerForResend.id = setInterval(this.timerForResending, 1000)
        this.$refs?.code1?.$el?.focus()
      })
    },
    timerForResending() {
      if (this.timerForResend.seconds !== 1) {
        this.timerForResend.seconds -= 1
      } else {
        clearInterval(this.timerForResend.id)
        this.showResendBtn = true
      }
    },
    async sendVerificationCodeViaEmail(code) {
      const result = await this[verifyTypes.SEND_VERIFICATIONCODE_VIA_EMAIL]({
        code,
        email: this.email,
      })
      this.successVerification = result
      if (result === true) {
        this.$emit('success')
      } else {
        setTimeout(() => {
          this.resetCode()
          this.$refs?.code1?.$el?.focus()
        }, 2000)
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
    // sendVerificationCodeViaMessanger(code) {
    //   this[verifyTypes.SEND_VERIFICATIONCODE_VIA_MESSANGER]({
    //     code,
    //     phone: this.clearPhone,
    //   }).then((result) => {
    //     this.successVerification = result
    //     if (result === true) this.$emit('success')
    //   })
    // },
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
          // if (this.isSms) {
          if (this.phone) this.debounced.sendVerificationCodeViaSms(code)
          if (this.email) this.debounced.sendVerificationCodeViaEmail(code)
          // } else {
          // this.debounced.sendVerificationCodeViaMessanger(code)
          // }
        }
      }
    },
  },
}
</script>
