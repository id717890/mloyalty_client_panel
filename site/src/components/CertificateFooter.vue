<template>
  <div class="mloayalty-certificate-footer">
    <div class="row">
      <div class="col-6 d-flex justify-content-start align-items-center">
        <img
          class="logo ml-5"
          src="~@/assets/img/default/header-logo.png"
          @click.prevent="goToHome"
          alt=""
        />
        <a href="#" class="share-ref ml-2" v-if="showTitle">
          Дарить легко
        </a>
      </div>
      <div class="col-6 d-flex justify-content-end align-items-center">
        <a href="#" class="share-ref mr-3">Подписаться</a>
        <a href="#" class="mloyalty-social-btn">
          <v-icon>mdi-telegram</v-icon>
        </a>
        <a href="#" class="mloyalty-social-btn">
          <v-icon>mdi-whatsapp</v-icon>
        </a>
        <a href="#" class="mloyalty-social-btn mr-5">
          <img
            src="~@/assets/img/default/send-method-viber-unselect3.svg"
            style="transform: scale(1.35)"
            alt=""
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showTitle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToHome() {
      this.$router.push('/')
    }
  }
}
</script>
