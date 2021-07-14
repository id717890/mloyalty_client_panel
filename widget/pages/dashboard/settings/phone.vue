<template>
  <div class="vh100 d-flex flex-column">
    <div v-if="notify" class="ml-settings-error">
      {{ notify }}
    </div>
    <MlHeaderPage :back-url="'/dashboard/settings'" title="Замена телефона" />
    <div class="px-10 pt-6">
      <verification-code
        v-if="isSentVerificationCode"
        :justify-center="true"
        :phone="phoneClear"
        class="text-center"
        :type="channelType"
        :code-type="smsCodeType"
        :istyle="'ml-input-code2'"
        @success="successVerificationProcess"
      >
        <template #title>
          <div class="ml-title-14-20">
            Мы отправили код подтверждения на номер {{ phone }}
          </div>
        </template>
        <template #footer>
          <div class="text-center mt-6">
            <router-link
              to="/dashboard/settings"
              class="ml-text-15-20 ml-text-grey2"
            >
              Изменить номер телефона
            </router-link>
          </div>
        </template>
        <!-- <template #text>
          <div class="ml-title-14-20">
            Вводя смс-код вы соглашаетесь с
            <a href="#" @click.prevent="openRules"
              ><u>правилами программы</u></a
            >
          </div>
        </template> -->
      </verification-code>
    </div>
  </div>
</template>

<script>
import verificationCode from '@/components/VerificationCode'
import { mapState, mapActions, mapMutations } from 'vuex'
import verifyTypes from '@/store/verify/types'
import settingsTypes from '@/store/settings/types'
import mixinSettings from '@/helpers/mixins/settings'

const COMMUNICATION_TYPE = 1
export default {
  components: {
    verificationCode,
  },
  mixins: [mixinSettings],
  layout: 'dashboard',
  data: () => ({
    loading: false,
    phone: null,
    isSentVerificationCode: false, // Признак того что отправили код, т.е. нажали на кнопку "Подтвердить"
    successVerification: false,
  }),
  computed: {
    ...mapState({
      settings: (state) => state?.settings,
    }),
    channelType() {
      return this.$const?.SEND_METHOD?.SMS?.COMMUNICATION_TYPE // = 1
    },
    smsCodeType() {
      return this.$const?.SMS_CODE_TYPE?.SERT_BUYER // CodeType = 1
    },
    validatePhone() {
      return this.phone?.length === 15
    },
    phoneClear() {
      return this.phone
        ? this.$helper.getClearPhone(this.phone, true)
        : this.phone
    },
  },
  mounted() {
    this.phone = this.settings?.phone || 79527247500
    if (this.phone) this.requestCode()
  },
  methods: {
    ...mapActions('verify', [verifyTypes.REQUEST_CODE]),
    ...mapActions('settings', [settingsTypes.SAVE_SETTINGS_PHONE_ACTION]),
    ...mapMutations('settings', [settingsTypes.SET_SETTINGS_PHONE_IS_VERIFY]),
    async successVerificationProcess() {
      this.successVerification = true
      // await this[clientTypes.CLIENT_CREATE_ACTION_2](this.clearPhone)

      this[settingsTypes.SET_SETTINGS_PHONE_IS_VERIFY](true)
      const { emailIsVerify } = this.settings
      if (this.isEmailChanged && !emailIsVerify) {
        return this.$router.push({ name: 'dashboard-settings-email' })
      }

      const result = await this[settingsTypes.SAVE_SETTINGS_PHONE_ACTION]()
      if (!result) return
      const response = await this[settingsTypes.SAVE_SETTINGS_ACTION]()
      if (response) {
        this.$router.push({ name: 'dashboard-settings' })
        this.setNotify('Изменения сохранены')
      }
    },
    requestCode() {
      this.isSentVerificationCode = true
      const phone = this.$helper.getClearPhone(this.phone, true)
      const communicationtype = COMMUNICATION_TYPE
      this[verifyTypes.REQUEST_CODE]({
        phone,
        communicationtype,
      }).then(() => (this.isSentVerificationCode = true))
    },
  },
}
</script>
