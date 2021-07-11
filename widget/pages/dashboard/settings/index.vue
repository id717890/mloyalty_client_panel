<template>
  <div class="vh100 d-flex flex-column">
    <MlHeaderPage class="" title="Профиль" />
    <div class="px-10 pt-1">
      <MlInputText
        :placeholder="'Введите имя'"
        :title="'Имя'"
        :value="form.fio"
        @input="handleFio"
      />
      <MlInputText
        ref="phoneField"
        :placeholder="'Введите телефон'"
        :title="'Телефон'"
        :mask-field="'+7 (###) ###-##-##'"
        :value="form.phone"
        @input="handlePhone"
      />
      <MlInputText
        :placeholder="'Не указан'"
        :title="'E-mail'"
        :value="form.email"
        @input="handleEmail"
      />
      <MlInputDate
        :placeholder="'Введите дату рождения'"
        :title="'Дата рождения'"
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
        :disabled="!allowSave"
        class="ml-black-btn ml-radius-32 w100 mt-8"
        @click="save"
      >
        <v-icon>mdi-content-save</v-icon>
        Сохранить изменения
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { parseISO } from 'date-fns'
import settingsTypes from '@/store/settings/types'
import format from 'date-fns/format'

export default {
  name: 'UserSettings',
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
  }),
  computed: {
    ...mapState({
      clientInfo: (state) => state?.client?.clientInfo,
      settings: (state) => state?.settings,
    }),
    genders() {
      return this.$const.GENDERS
    },
    isPhoneChanged() {
      const { phone } = this.settings
      const { Phone } = this.clientInfo
      // console.log(
      //   this.$helper?.getClearPhone(phone, true),
      //   this.$helper?.getClearPhone(Phone)
      // )
      if (!phone) return false
      return (
        this.$helper?.getClearPhone(phone, true) !==
        this.$helper?.getClearPhone(Phone)
      )
    },
    allowSave() {
      const { fio, email, birthdate, gender } = this.settings
      const { Birthdate } = this.clientInfo?.Birthdate
      let clientBirthdate, settingsBirthdate
      if (Birthdate) {
        clientBirthdate = format(parseISO(Birthdate))
      }
      if (birthdate) {
        settingsBirthdate = format(parseISO(this.form.birthdate))
      }

      return (
        this.form?.fio !== fio ||
        this.form?.email !== email ||
        this.form?.gender !== gender ||
        this.isPhoneChanged ||
        clientBirthdate !== settingsBirthdate
      )
    },
  },
  mounted() {
    if (this.clientInfo) {
      const { Name, Phone, Email, Birthdate, Gender } = this.clientInfo
      const { fio, phone, email, birthdate, gender } = this.settings
      this.form.fio = fio || Name
      this.form.phone = phone || Phone
      this.form.email = email || Email
      this.form.birthdate = new Date(parseISO(birthdate || Birthdate))
        .toISOString()
        .substr(0, 10)
      this.form.gender = this.initGender(gender || Gender)
    }
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
      this[settingsTypes.SET_SETTINGS_GENDER](value?.id)
      this[settingsTypes.SET_SETTINGS_IS_SAVED](false)
    },
    save() {
      this[settingsTypes.SAVE_SETTINGS_ACTION](1234)
    },
  },
}
</script>
