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
        :placeholder="'Введите телефон'"
        :title="'Телефон'"
        :value="form.fio"
        @input="handleFio"
      />
      <MlInputText
        :placeholder="'Введите E-mail'"
        :title="'E-mail'"
        :value="form.fio"
        @input="handleFio"
      />
      <MlInputText
        :placeholder="'Введите дату рождения'"
        :title="'Дата рождения'"
        :value="form.fio"
        @input="handleFio"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'dashboard',
  data: () => ({
    form: {
      fio: null,
      phone: null,
      email: null,
      birthdate: null,
      gender: null,
    },
  }),
  computed: {
    ...mapState({
      clientInfo: (state) => state?.client?.clientInfo,
    }),
  },
  mounted() {
    if (this.clientInfo) {
      const { Name, Phone, Email, Birthdate, Gender } = this.clientInfo
      this.form.fio = Name
      this.form.phone = Phone
      this.form.email = Email
      this.form.birthdate = Birthdate
      this.form.gender = Gender
    }
  },
  methods: {
    handleFio(e) {
      this.form.fio = e
    },
  },
}
</script>
