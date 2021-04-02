<template>
  <div class="d-flex flex-column h100">
    <div class="wrapper-alert" v-if="alert">
      <div class="black-alert" style="height: auto">
        :( Мы сожалеем, но что-то пошло не так... Повторите попытку
      </div>
    </div>
    <div class="pb h100">
      <div class="row" v-if="!isSent">
        <div class="col-12 pb-0">
          <v-select
            class="ml-select ml-hide-details"
            v-model="form.type"
            :items="option.types"
            label="Тема обращения*"
            outlined
            item-text="name"
            return-object
            color="dark"
          >
            <template #item="{item}">
              <div>
                <v-icon v-if="typeId === item.id">mdi-check</v-icon>
                {{ item.name }}
              </div>
            </template>
          </v-select>
        </div>
        <div class="col-12 pb-0">
          <v-text-field
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
            v-model="form.name"
            color="dark"
          ></v-text-field>
        </div>
        <div class="col-12 pb-0">
          <v-text-field
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
            v-model="form.email"
          ></v-text-field>
        </div>
        <div class="col-12 pb-0">
          <v-text-field
            color="dark"
            prepend-inner-icon="+7"
            append-icon="mdi-check"
            v-mask="'(###) ###-##-##'"
            autocomplete="off"
            required
            height="60"
            label="Телефон *"
            class="ml-input ml-input-prepend-inner ml-hide-details"
            :class="{ novalidate: validatePhone === false }"
            outlined
            v-model="form.phone"
          ></v-text-field>
        </div>
        <div class="col-12 pb-0">
          <MlTextarea
            v-model="form.message"
            placeholder="Текст сообщения"
            :maxlength="500"
          />
        </div>
        <div class="col-12">
          <button
            class="ml-black-btn"
            style="width: 100%"
            :disabled="!validateForm"
            @click.stop="sendMessage"
          >
            Отправить
          </button>
        </div>
      </div>
      <div class="row h100" v-else>
        <div
          class="col-12 d-flex flex-column align-center justify-content-center"
        >
          <img src="@/assets/img/success-message.png" class="mb-6" alt="" />
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

export default {
  name: 'Support-Page',
  directives: {
    mask
  },
  components: {
    MlTextarea
  },
  data: () => ({
    isSent: false,
    alert: false,
    emailRules: [
      v => !!v || 'Необходимо заполнить e-mail',
      v => /.+@.+/.test(v) || 'Введен некорректный E-mail'
    ],
    nameRules: [v => !!v || 'Необходимо заполнить Имя'],
    option: {
      types: [
        {
          id: 1,
          name: 'Покупка карты / сертификата'
        },
        {
          id: 2,
          name: 'Использование карты / сертификата'
        },
        {
          id: 3,
          name: 'Рекомендации'
        }
      ]
    },
    form: {
      type: null,
      name: null,
      email: null,
      phone: null,
      message: null
    }
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
    }
  },
  methods: {
    sendMessage() {
      this.alert = true
      setTimeout(() => {
        this.alert = false
        this.isSent = true
      }, 3000)
    },
    goBack() {
      this.form.email = null
      this.form.phone = null
      this.form.name = null
      this.form.message = null
      this.form.type = null
      this.isSent = false
    }
  }
}
</script>
