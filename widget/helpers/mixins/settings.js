import { mapState, mapActions, mapMutations } from 'vuex'
import settingsTypes from '@/store/settings/types'

export default {
  methods: {
    ...mapActions('settings', [settingsTypes.SAVE_SETTINGS_ACTION]),
    ...mapMutations('settings', [settingsTypes.SET_SETTINGS_NOTIFY]),
    setNotify(message) {
      this[settingsTypes.SET_SETTINGS_NOTIFY](message)
    },
  },
  watch: {
    notify(value) {
      if (value) {
        setTimeout(() => {
          this[settingsTypes.SET_SETTINGS_NOTIFY](null)
        }, 3000)
      }
    },
  },
  computed: {
    ...mapState({
      clientInfo: (state) => state?.client?.clientInfo,
      settings: (state) => state?.settings,
    }),
    notify() {
      return this.settings?.notify
    },
    isEmailChanged() {
      const { email } = this.settings
      const { Email } = this.clientInfo
      if (!email) return false
      return email !== Email
    },
    isPhoneChanged() {
      const { phone } = this.settings
      const { Phone } = this.clientInfo
      // console.log(
      //   this.$helper?.getClearPhone(phone, true),
      //   this.$helper?.getClearPhone(Phone)
      // )
      if (!phone) return false
      console.log(
        this.$helper?.getClearPhone(phone, true),
        this.$helper?.getClearPhone(Phone)
      )
      return (
        this.$helper?.getClearPhone(phone, true) !==
        this.$helper?.getClearPhone(Phone)
      )
    },
  },
}
