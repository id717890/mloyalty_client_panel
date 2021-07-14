<template>
  <div class="vh100 d-flex flex-column">
    <div v-if="notify" class="ml-settings-error">
      {{ notify }}
    </div>
    <MlHeaderPage class="" title="Профиль" />
    <div v-if="!loading" class="px-10 pt-1">
      <MlInputText
        :placeholder="'Введите имя'"
        :title="'Имя'"
        :value="form.fio"
        autocomplete="off"
        @input="handleFio"
      />
      <MlInputText
        ref="phoneField"
        :placeholder="'Введите телефон'"
        :title="'Телефон'"
        :mask-field="'+7 (###) ###-##-##'"
        autocomplete="off"
        :value="form.phone"
        @input="handlePhone"
      />
      <MlInputText
        :placeholder="'Не указан'"
        :title="'E-mail'"
        autocomplete="off"
        :value="form.email"
        @input="handleEmail"
      />
      <MlInputDate
        :placeholder="'Введите дату рождения'"
        :title="'Дата рождения'"
        autocomplete="off"
        :value="form.birthdate"
        @input="handleDate"
      />
      <MlSelect
        :placeholder="'Выберите пол'"
        :title="'Пол'"
        :items="genders"
        :value="form.gender"
        @input="handleGender"
      />
      <button
        v-if="showSave"
        class="ml-black-btn ml-radius-32 w100 mt-8 ml-bg2"
        @click="save"
      >
        <v-icon>mdi-content-save</v-icon>
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
import { format, parseISO } from 'date-fns'
import settingsTypes from '@/store/settings/types'
import mixinSettings from '@/helpers/mixins/settings'
import { mask } from 'vue-the-mask'

export default {
  name: 'UserSettings',
  directives: { mask },
  mixins: [mixinSettings],
  layout: 'dashboard',
  data: () => ({
    form: {
      fio: null,
      phone: null,
      email: null,
      birthdate: null,
      gender: null,
    },
    isEditedFio: false,
    isEditedEmail: false,
    isEditedPhone: false,
    isEditedGender: false,
    isEditedBirthdate: false,
    loading: false,
  }),
  computed: {
    genders() {
      return this.$const.GENDERS
    },
    isPhoneCorrect() {
      const { phone } = this.settings
      const phoneLength = phone
        ? this.$helper?.getClearPhone(phone, true).length
        : 0
      return phoneLength === 10
    },
    isVerifyForm() {
      return this.isPhoneCorrect
    },

    isEmailCorrect() {
      return /.+@.+/.test(this.form.email)
    },
    isFioChanged() {
      const { fio } = this.settings
      const { Name } = this.clientInfo
      if (!fio) return false
      return Name !== fio
    },
    isGenderChanged() {
      const { gender } = this.settings
      const { Gender } = this.clientInfo
      console.log('gender', gender, Gender)
      if (gender === null) return false
      return Gender !== gender
    },
    isBirthdateChanged() {
      const { birthdate } = this.settings
      const { Birthdate } = this.clientInfo
      if (!birthdate) return false
      let clientBirthdate, settingsBirthdate
      if (Birthdate) {
        clientBirthdate = format(parseISO(Birthdate), 'dd.MM.yyyy')
      }
      if (birthdate) {
        settingsBirthdate = format(parseISO(this.form.birthdate), 'dd.MM.yyyy')
      }
      console.log(birthdate, Birthdate)
      console.log(
        'bd',
        settingsBirthdate,
        clientBirthdate,
        clientBirthdate !== settingsBirthdate
      )

      return clientBirthdate !== settingsBirthdate
    },
    showSave() {
      return (
        this.isFioChanged ||
        this.isPhoneChanged ||
        this.isEmailChanged ||
        this.isBirthdateChanged ||
        this.isGenderChanged
      )
    },
    allowSave() {
      return (
        this.isFioChanged ||
        (this.isPhoneChanged && this.isPhoneCorrect) ||
        (this.isEmailChanged && this.isEmailCorrect) ||
        this.isBirthdateChanged ||
        this.isGenderChanged
      )
    },
  },
  created() {
    this.loading = true
  },
  mounted() {
    if (this.clientInfo) {
      // const tzoffset = new Date().getTimezoneOffset() * 60000 // offset in milliseconds

      const { Name, Phone, Email, Birthdate, Gender } = this.clientInfo
      const { fio, phone, email, birthdate, gender } = this.settings
      this.form.fio = fio || Name
      this.form.phone = phone || Phone
      this.form.email = email || Email
      // this.form.birthdate = new Date(parseISO(birthdate || Birthdate))
      //   .toISOString()
      //   .substr(0, 10)
      this.form.birthdate = this.$helper?.getDateFormat(
        birthdate || Birthdate,
        'yyyy-MM-dd'
      )
      this.form.gender = this.initGender(gender || Gender)
      // console.log(parseISO(birthdate || Birthdate))
      // console.log(new Date(parseISO(birthdate || Birthdate)))
      // console.log(new Date(parseISO(birthdate || Birthdate)).toISOString())
      // console.log(new Date(parseISO(birthdate || Birthdate)).toUTCString())
    }
    setTimeout(() => {
      this.loading = false
    })
  },
  methods: {
    ...mapActions('settings', [settingsTypes.SAVE_SETTINGS_ACTION]),
    ...mapMutations('settings', [
      settingsTypes.SET_SETTINGS_FIO,
      settingsTypes.SET_SETTINGS_PHONE,
      settingsTypes.SET_SETTINGS_EMAIL,
      settingsTypes.SET_SETTINGS_BIRTHDATE,
      settingsTypes.SET_SETTINGS_GENDER,
      settingsTypes.SET_SETTINGS_IS_SAVED,
      settingsTypes.SET_SETTINGS_PHONE_IS_VERIFY,
      settingsTypes.SET_SETTINGS_EMAIL_IS_VERIFY,
    ]),
    initGender(value) {
      if (!this.genders) return null
      const find = this.genders.find((x) => x.id === value)
      return find
    },
    handleFio(value) {
      this.form.fio = value
      this[settingsTypes.SET_SETTINGS_FIO](value)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
    },
    handlePhone(value) {
      this.form.phone = value
      this[settingsTypes.SET_SETTINGS_PHONE](value)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
      if (this.isPhoneChanged) {
        this[settingsTypes.SET_SETTINGS_PHONE_IS_VERIFY](false)
      }
    },
    handleEmail(value) {
      this.form.email = value
      this[settingsTypes.SET_SETTINGS_EMAIL](value)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
    },
    handleDate(value) {
      this.form.birthdate = value
      this[settingsTypes.SET_SETTINGS_BIRTHDATE](value)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
    },
    handleGender(value) {
      this.gender = value
      console.log('new gender', value)
      this[settingsTypes.SET_SETTINGS_GENDER](value?.id)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
    },
    async save() {
      const { phoneIsVerify, emailIsVerify } = this.settings
      if (this.isPhoneChanged && !phoneIsVerify) {
        return this.$router.push({ name: 'dashboard-settings-phone' })
        // this.$router.push({ name: 'dashboar-settings-email' })
      }
      if (this.isEmailChanged && !emailIsVerify) {
        return this.$router.push({ name: 'dashboard-settings-email' })
      }
      const response = await this[settingsTypes.SAVE_SETTINGS_ACTION]()
      console.log('index resp', response)
      if (response) {
        this.setNotify('Изменения сохранены')
      }
    },
  },
}
</script>
