<template>
  <div>
    <MlHeaderPage title="Поддержка" />
    <div v-if="alert" class="ml-wrapper-alert pa-5 pb-0">
      <div class="ml-black-alert" style="height: auto">
        :( Мы сожалеем, но что-то пошло не так... Повторите попытку
      </div>
    </div>
    <div class="pa-5">
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
            :disabled="loading"
            @click.stop="sendMessage"
          >
            Отправить
            <v-icon v-if="!loading">mdi-telegram</v-icon>
            <v-progress-circular
              v-if="loading"
              indeterminate
              width="2"
              size="20"
            ></v-progress-circular>
          </button>
        </div>
      </div>
      <div v-else>
        <div
          class="d-flex flex-column align-center justify-content-center pt-16 mt-5"
        >
          <img src="/image/success-message.png" class="mb-6" alt="" />
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
import MlTextarea from '@/components/UI/MlTextarea'
import { mapActions } from 'vuex'
import supportTypes from '@/store/support/types'

export default {
  name: 'SupportPage',
  components: {
    MlTextarea,
  },
  layout: 'dashboard',
  data: () => ({
    loading: false,
    isSent: false,
    alert: false,
    option: {
      types: [
        {
          id: 1,
          name: 'Не начислены бонусы',
        },
        {
          id: 2,
          name: 'Не списаны бонусы',
        },
        {
          id: 3,
          name: 'Вопрос по акции',
        },
      ],
    },
    form: {
      // type: {
      // id: 1,
      // name: 'Не начислены бонусы',
      // },
      // message: 'test message',
      type: null,
      message: null,
    },
  }),
  computed: {
    validateForm() {
      return this.form.type
    },
    typeId() {
      return this.form?.type?.id
    },
  },
  methods: {
    ...mapActions('support', [supportTypes.NEW_SUPPORT_REQUEST_ACTION]),
    async sendMessage() {
      this.loading = true
      const result = await this[supportTypes.NEW_SUPPORT_REQUEST_ACTION]({
        leadmessage: {
          subject: this.form?.type?.name,
          leadtext: this.form?.message,
        },
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
      this.form.message = null
      this.form.type = null
      this.isSent = false
    },
  },
}
</script>
