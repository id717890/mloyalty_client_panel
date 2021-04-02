<template>
  <div class="mloyalty-preview px-8">
    <div class="row">
      <div class="col-12 text-center">
        <img src="@/assets/img/example/riv-gosh.png" alt="" />
        <div class="m-title mb-2">
          Сертификат на 3000 ₽ <br />
          «РивГош»
        </div>
        <div class="expiration">
          Действует до 29.04.2020
        </div>
        <div class="congratulation mt-6">
          С днем рождения! Желаю крепкого здоровья, удачи, благополучия, добра,
          радости, любви, счастья, хорошего настроения, улыбок, ярких
          впечатлений. Пусть тепло и уют всегда наполняют твой дом, пусть
          солнечный свет согревает в любую погоду, при одной мысли о них.
        </div>
      </div>
      <div class="col-12 text-center">
        <img src="@/assets/img/example/riv-gosh-card.png" alt="" />
        <img
          src="@/assets/img/example/riv-gosh-bar-code.png"
          class="mt-6"
          alt=""
        />
        <div class="card-number">
          Номер карты: 126324789743873
        </div>
        <div class="card-pin-code">
          PIN-код: 678 579
        </div>
      </div>
      <div class="col-12">
        <a
          href="#"
          class="ml-silver-btn d-flex align-center justify-center mb-2"
        >
          <img class="mr-3" src="@/assets/img/example/wallet.png" alt="" />
          Сохранить в Wallet
        </a>
        <a href="#" class="ml-silver-btn mb-2">
          Сохранить как изображение
        </a>
        <a href="#" class="ml-silver-btn mb-2">
          Отпрваить на E-mail
        </a>
      </div>
    </div>
    <div class="row how-use mt-6 pt-6">
      <div class="col-12">
        <div class="how-use-title mb-6">Как использовать, и где действует?</div>
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
          <div class="content">Оплатите всю или часть покупки сертификатом</div>
        </div>

        <div class="ml-info my-6">
          <span>
            Подробности на сайте
            <a href="https://rivegauche.ru" target="_blank"> rivegauche.ru</a>
          </span>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="text7 mt-5 mb-2">Часто задаваемые вопросы</div>
        <faq style="margin-left: -32px; margin-right: -32px" />
      </div>
    </div>
  </div>
</template>

<script>
import faq from '@/components/Burger/Pages/FAQ'

export default {
  components: {
    faq
  },
  methods: {}
}
</script>

<style></style>
