<template>
  <div class="d-flex flex-column h100">
    <div v-if="alert" class="wrapper-alert pb pb-0 pt-8">
      <div class="black-alert" style="height: auto">
        :( Мы сожалеем, но что-то пошло не так... Повторите попытку
      </div>
    </div>
    <div class="pb pt-8 h100">
      <div v-if="!isSent">
        <div class="pb-0">
          <v-select
            v-model="form.type"
            class="ml-select ml-hide-details"
            :items="option.types"
            label="Тема обращения*"
            outlined
            item-text="name"
            return-object
            color="dark"
          >
            <template #item="{ item }">
              <div
                :style="{ paddingLeft: typeId === item.id ? '0px' : '30px' }"
              >
                <v-icon v-if="typeId === item.id">mdi-check</v-icon>
                {{ item.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="pb-0">
          <v-text-field
            v-model="form.name"
            append-icon="mdi-check"
            autocomplete="off"
            type="text"
            required
            :rules="nameRules"
            height="60"
            label="Имя *"
            class="ml-input ml-hide-details"
            :class="{ novalidate: validateName === false }"
            outlined
            color="dark"
          ></v-text-field>
        </div>
        <div class="pb-0">
          <v-text-field
            v-model="form.email"
            color="dark"
            append-icon="mdi-check"
            type="email"
            autocomplete="off"
            required
            :rules="emailRules"
            height="60"
            label="E-mail *"
            class="ml-input ml-hide-details"
            :class="{ novalidate: validateEmail === false }"
            outlined
          ></v-text-field>
        </div>
        <div class="pb-0">
          <v-text-field
            v-model="form.phone"
            v-mask="'(###) ###-##-##'"
            color="dark"
            prepend-inner-icon="+7"
            append-icon="mdi-check"
            autocomplete="off"
            required
            :rules="phoneRules"
            height="60"
            label="Телефон *"
            class="ml-input ml-input-prepend-inner ml-hide-details"
            :class="{ novalidate: validatePhone === false }"
            outlined
          ></v-text-field>
        </div>
        <div class="pb-0">
          <MlTextarea
            v-model="form.message"
            placeholder="Текст сообщения"
            :maxlength="500"
          />
        </div>
        <div class="pt-1">
          <button
            class="ml-black-btn"
            style="width: 100%"
            :disabled="!validateForm"
            @click.stop="sendMessage"
          >
            Отправить
            <v-progress-circular
              v-if="loading"
              indeterminate
              width="2"
              size="20"
            ></v-progress-circular>
          </button>
        </div>
      </div>
      <div v-else class="h100">
        <div
          class="h100 d-flex flex-column align-center justify-content-center"
        >
          <img src="/imgage/success-message.png" class="mb-6" alt="" />
          <div class="text6 text-center mb-6">
            Спасибо! <br />
            Ваше обращение принято. <br />Ожидайте ответа.
          </div>
          <a href="#" class="ml-black-btn" @click.prevent="goBack">
            Вернуться назад
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from 'vue-the-mask'
import MlTextarea from '@/components/UI/MlTextarea'
import { mapActions } from 'vuex'
import supportTypes from '@/store/support/types'

export default {
  name: 'SupportPage',
  directives: {
    mask,
  },
  components: {
    MlTextarea,
  },
  data: () => ({
    loading: false,
    isSent: false,
    alert: false,
    emailRules: [
      (v) => !!v || 'Необходимо заполнить e-mail',
      (v) => /.+@.+/.test(v) || 'Введен некорректный E-mail',
    ],
    nameRules: [(v) => !!v || 'Необходимо заполнить Имя'],
    phoneRules: [(v) => !!v || 'Необходимо заполнить Телефон'],
    option: {
      types: [
        {
          id: 1,
          name: 'Покупка карты / сертификата',
        },
        {
          id: 2,
          name: 'Использование карты / сертификата',
        },
        {
          id: 3,
          name: 'Рекомендации',
        },
      ],
    },
    form: {
      // type: {
      //   id: 1,
      //   name: 'Покупка карты / сертификата'
      // },
      // name: 'Zam ',
      // email: 'qwe@qwe.ru',
      // phone: 9224870500,
      // message: 'test message'
      type: null,
      name: null,
      email: null,
      phone: null,
      message: null,
    },
  }),
  computed: {
    validateForm() {
      return (
        this.validateEmail &&
        this.validatePhone &&
        this.validateName &&
        this.form.type
      )
    },
    typeId() {
      return this.form?.type?.id
    },
    validateName() {
      return this.form?.name?.length > 0
    },
    validatePhone() {
      return this.form?.phone?.length === 15
    },
    validateEmail() {
      return /.+@.+/.test(this.form.email)
    },
  },
  methods: {
    ...mapActions('support', [supportTypes.NEW_SUPPORT_REQUEST_ACTION]),
    async sendMessage() {
      this.loading = true
      const result = await this[supportTypes.NEW_SUPPORT_REQUEST_ACTION]({
        phone: this.$helper.getClearPhone(this.form?.phone),
        email: this.form?.email,
        leadname: this.form?.name,
        leadmessage: {
          subject: this.form?.type?.name,
          leadtext: this.form?.message,
        },
        direction: 2,
        type: 4,
        formname: 'Поддержка_Виджет',
      })
      this.loading = false
      if (result) {
        this.isSent = true
      } else {
        this.alert = true
        setTimeout(() => {
          this.alert = false
        }, 3000)
      }
    },
    goBack() {
      this.form.email = null
      this.form.phone = null
      this.form.name = null
      this.form.message = null
      this.form.type = null
      this.isSent = false
    },
  },
}
</script>
