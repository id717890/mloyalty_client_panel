<template>
  <div class="h100 ml-preview-page mloyalty-preview">
    <div
      v-if="!show"
      class="h100 d-flex justify-content-center align-items-center"
    >
      <SwipeButton
        ref="swipeButton"
        initialInstructionText="потяните, чтобы открыть"
        class="ml-swipe-button"
        @actionConfirmed="onActionConfirmed"
      />
    </div>
    <div class="ml-preview-container px-4" v-show="show">
      <img
        class="ml-confeti"
        ref="confeti"
        src="@/assets/img/confetti.png"
        alt=""
      />
      <div class="ml-perview-card ml-perview-card-shrink" ref="preview">
        <div class="ml-pervie-card-wrapper">
          <div class="row">
            <div
              class="col-12 text-center d-flex flex-column align-items-center"
            >
              <img src="@/assets/img/example/riv-gosh.png" alt="" />
              <div class="m-title mb-2">Сертификат</div>
              <div class="m-title mb-2">на 3000 ₽</div>
              <div class="m-title mb-2 m-title-hidden">
                «РивГош»
              </div>
              <div class="expiration mt-2 mb-3">
                Действует до 29.04.2020
              </div>
              <div class="congratulation-preview mt-6">
                <div>С днем рождения!</div>
                Желаю крепкого здоровья, удачи, благополучия, добра, радости,
                любви, счастья, хорошего настроения, улыбок, ярких впечатлений.
                Пусть тепло и уют всегда наполняют твой дом, пусть солнечный
                свет согревает в любую погоду, при одной мысли о них.
              </div>
            </div>
            <div class="col-12 d-flex flex-column align-items-center">
              <img
                src="@/assets/img/example/riv-gosh-card.png"
                alt=""
                class="mb-4 mloyalty-certificate-image"
              />
              <img
                src="@/assets/img/example/riv-gosh-bar-code.png"
                class="mloyalty-preview-bar-code"
                alt=""
              />
              <div class="card-number">
                Номер: 2998760000012
              </div>
              <div class="card-pin-code">
                PIN-код: 6789
              </div>
            </div>
            <div class="col-12  d-flex flex-column align-items-center">
              <a
                href="#"
                class="ml-silver-btn d-flex align-items-center justify-content-center mb-2 mloyalty-preview-btn"
              >
                <img
                  class="mr-3"
                  src="@/assets/img/example/wallet.png"
                  alt=""
                />
                Сохранить в Wallet
              </a>
              <a href="#" class="ml-silver-btn mb-2 mloyalty-preview-btn">
                Сохранить в галерею
              </a>
              <a href="#" class="ml-silver-btn mb-3 mloyalty-preview-btn">
                Отправить на E-mail
              </a>
            </div>
          </div>
          <div class="row how-use mt-6 pt-6">
            <div class="col-12">
              <div class="how-use-title mb-3 mt-2">
                Как использовать?
              </div>
              <div class="item">
                <div class="numb">1</div>
                <div class="content">Сохраните сертификат и PIN-код</div>
              </div>
              <div class="item">
                <div class="numb">2</div>
                <div class="content">
                  Выберите магазин, в котором можно использовать сертификат
                </div>
              </div>
              <div class="item">
                <div class="numb">3</div>
                <div class="content">
                  Сообщите или введите в магазине номер сертификата и PIN-код
                </div>
              </div>
              <div class="item">
                <div class="numb">4</div>
                <div class="content">
                  Оплатите всю или часть покупки сертификатом
                </div>
              </div>

              <div class="ml-info my-6">
                <span>
                  Подробности на сайте
                  <a href="https://rivegauche.ru" target="_blank">
                    rivegauche.ru</a
                  >
                </span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="text7 mt-2 mb-2">Часто задаваемые вопросы</div>
              <faq style="margin-left: -32px; margin-right: -32px" />
            </div>
          </div>
        </div>
        <certificate-footer show-title />
      </div>
    </div>
  </div>
</template>

<script>
import SwipeButton from '@/components/UI/SwipeButton'
import faq from '@/components/Burger/Pages/FAQ'
import certificateFooter from '@/components/CertificateFooter'

export default {
  components: { SwipeButton, faq, certificateFooter },
  data: () => ({
    show: false
  }),
  methods: {
    onActionConfirmed() {
      this.$refs.preview.classList.add('ml-perview-card-shrink')
      setTimeout(() => {
        this.show = true
        this.bounce()
        // this.$refs.swipeButton.reset()
      }, 300)
    },
    bounce() {
      setTimeout(() => {
        this.$refs.preview.classList.remove('ml-perview-card-shrink')
        this.$refs.confeti.classList.add('ml-confeti-bounce')
        setTimeout(() => {
          this.$refs.confeti.remove()
        }, 400)
      }, 100)
    }
  },
  mounted() {
    // this.show = true
    // this.onActionConfirmed()
    // this.bounce()
  }
}
</script>
