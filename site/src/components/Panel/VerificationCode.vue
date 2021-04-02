<template>
  <div class="row">
    <div class="col-12 pt-0">
      <p class="text1">Введите код подтверждения</p>
    </div>
    <div class="col-12 d-flex align-center">
      <MlInputCode
        :invalid="invalidCode"
        ref="code1"
        v-model="number1OfCode"
        class="mr-2"
        @input="proccessNumber1"
      />
      <MlInputCode
        ref="code2"
        :invalid="invalidCode"
        v-model="number2OfCode"
        @input="proccessNumber2"
        class="mr-2"
      />
      <MlInputCode
        ref="code3"
        :invalid="invalidCode"
        v-model="number3OfCode"
        @input="proccessNumber3"
        class="mr-2"
      />
      <MlInputCode
        ref="code4"
        :invalid="invalidCode"
        v-model="number4OfCode"
        @input="proccessNumber4"
        class="mr-2"
      />

      <v-progress-circular
        v-if="processVerificationCode"
        indeterminate
        class="ml-2"
        width="2"
        color="#000000"
      ></v-progress-circular>
    </div>
    <div class="col-12 error-message" v-if="invalidCode">
      Введён неверный код подтверждения
    </div>
    <div v-if="isSms" class="col-12 text2">
      Код подтверждения отправлен Вам в смс
    </div>
    <div v-if="isMessenger" class="col-12 text2">
      Ссылка для получения кода подтверждения в Telegram, отправлена Вам в смс.
      Перейдите по ссылке и получите код подтверждения.
    </div>
    <slot name="text"> </slot>
    <div class="col-12 text-center text2" v-if="!showResendBtn">
      {{ timerForResendText }}
    </div>
    <div class="col-12 text-center text2" v-if="showResendBtn">
      <a href="#" @click.prevent="startTimerForResend">Отправить повторно</a>
    </div>
  </div>
</template>

<script>
import {
  VERIFICATION_BY_SMS,
  VERIFICATION_BY_MESSENGER
} from '@/helpers/const/sendingMethod'
import MlInputCode from '@/components/UI/MlInputCode'
import { mapActions, mapState } from 'vuex'
import verificationCodeTypes from '@/store/verificationCode/types'
import { debounce } from 'lodash'

const TIMER_SECONDS = 60

export default {
  props: {
    type: {
      type: String,
      required: true
    }
  },
  components: {
    MlInputCode
  },
  data: () => ({
    timerForResend: {
      seconds: TIMER_SECONDS,
      id: null
    },
    successVerification: null,
    showResendBtn: false,
    number1OfCode: null,
    number2OfCode: null,
    number3OfCode: null,
    number4OfCode: null
  }),
  computed: {
    ...mapState({
      processVerificationCode: state =>
        state.verificationCode.isInitCodeInProccess
    }),
    timerForResendText() {
      return `Отправить повторно можно через ${this.timerForResend.seconds}с`
    },
    invalidCode() {
      return this.successVerification === false
    },
    isSms() {
      return this.type === VERIFICATION_BY_SMS
    },
    isMessenger() {
      return this.type === VERIFICATION_BY_MESSENGER
    }
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
      )
    }
    this.startTimerForResend()
  },
  methods: {
    ...mapActions('verificationCode', [
      verificationCodeTypes.SEND_VERIFICATIONCODE_VIA_SMS,
      verificationCodeTypes.SEND_VERIFICATIONCODE_VIA_MESSANGER
    ]),
    startTimerForResend() {
      this.showResendBtn = false
      this.timerForResend.seconds = TIMER_SECONDS
      this.timerForResend.id = setInterval(this.timerForResending, 1000)
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
      this[verificationCodeTypes.SEND_VERIFICATIONCODE_VIA_SMS](code).then(
        response => {
          const success = response?.success
          this.successVerification = success
          if (success === true) this.$emit('success')
        }
      )
    },
    sendVerificationCodeViaMessanger(code) {
      this[verificationCodeTypes.SEND_VERIFICATIONCODE_VIA_MESSANGER](
        code
      ).then(response => {
        const success = response?.success
        this.successVerification = success
        if (success === true) this.$emit('success')
      })
    },
    proccessNumber1() {
      if (this.number1OfCode) {
        this.$refs.code2.$el.focus()
      }
    },
    proccessNumber2() {
      if (this.number2OfCode) {
        this.$refs.code3.$el.focus()
      }
    },
    proccessNumber3() {
      if (this.number3OfCode) {
        this.$refs.code4.$el.focus()
      }
    },
    proccessNumber4() {
      this.$refs.code4.$el.blur()
      if (this.number4OfCode) {
        const code1 = this.number1OfCode
        const code2 = this.number2OfCode
        const code3 = this.number3OfCode
        const code4 = this.number4OfCode
        if (code1 && code2 && code3 && code4) {
          const code = Number(`${code1}${code2}${code3}${code4}`)
          if (this.type === VERIFICATION_BY_SMS) {
            this.debounced.sendVerificationCodeViaSms(code)
          } else {
            this.debounced.sendVerificationCodeViaMessanger(code)
          }
        }
      }
    }
  }
}
</script>
