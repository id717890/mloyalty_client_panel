<template>
  <div class="h100 d-flex flex-column align-center justify-content-center">
    <img src="~@/assets/img/cart1.png" alt="" class="mb-4" width="300" />
    <div class="text-success" style="font-weight: 600;">
      Поздравляем с удачной покупкой!
    </div>
    <div class="text-success" style="">
      Прямо сейчас мы отправим Вам <br />
      ссылку на скачивание сертификата
    </div>
    <a href="#" @click.prevent="newCertificate" class="ml-black-btn mt-8">
      <v-icon>mdi-plus</v-icon>
      Новый сертификат
    </a>
  </div>
</template>

<script>
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'
import { START_PAGE } from '@/helpers/const/widgetPage'

export default {
  mixins: [MixinChangePanelPage],
  methods: {
    newCertificate() {
      this.changePanelPage(START_PAGE)
    }
  }
}
</script>

<style></style>
