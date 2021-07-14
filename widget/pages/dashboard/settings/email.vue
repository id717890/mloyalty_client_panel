<template>
  <div class="vh100 d-flex flex-column">
    <div v-if="notify" class="ml-settings-error">
      {{ notify }}
    </div>
    <MlHeaderPage :back-url="'/dashboard/settings'" title="Замена e-mail" />
    <div class="px-10 pt-6">
      <verification-code
        v-if="isSentVerificationCode"
        :justify-center="true"
        :email="email"
        class="text-center"
        :type="channelType"
        :code-type="smsCodeType"
        :istyle="'ml-input-code2'"
        @success="successVerificationProcess"
      >
        <template #title>
          <div class="ml-title-14-20">
            Мы отправили код подтверждения на e-mail {{ email }}
          </div>
        </template>
        <template #footer>
          <div class="text-center mt-6">
            <router-link
              to="/dashboard/settings"
              class="ml-text-15-20 ml-text-grey2"
            >
              Изменить E-mail
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

export default {
  components: {
    verificationCode,
  },
  mixins: [mixinSettings],
  layout: 'dashboard',
  data: () => ({
    loading: false,
    email: null,
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
  },
  mounted() {
    this.email = this.settings?.email || 'jusupovz@gmail.com'
    if (this.email) this.requestEmailCode()
  },
  methods: {
    ...mapActions('verify', [verifyTypes.REQUEST_EMAIL_CODE]),
    ...mapMutations('settings', [settingsTypes.SET_SETTINGS_EMAIL_IS_VERIFY]),
    async successVerificationProcess() {
      this.successVerification = true
      this[settingsTypes.SET_SETTINGS_EMAIL_IS_VERIFY](true)

      const response = await this[settingsTypes.SAVE_SETTINGS_ACTION]()
      if (response) {
        this.$router.push({ name: 'dashboard-settings' })
        this.setNotify('Изменения сохранены')
      }
    },
    requestEmailCode() {
      this.isSentVerificationCode = true
      this[verifyTypes.REQUEST_EMAIL_CODE](this.email).then(
        () => (this.isSentVerificationCode = true)
      )
    },
  },
}
</script>
