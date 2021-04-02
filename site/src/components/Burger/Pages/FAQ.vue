<template>
  <div class="pb">
    <div
      class="mloyalty-faq-item"
      :ref="'mloyalty-faq-item-' + faqIndex"
      v-for="(faq, faqIndex) in faqs"
      :key="faqIndex"
    >
      <div class="mloyalty-question" @click="toggleFaq(faqIndex)">
        {{ faq.question }}
        <img
          class="mloyalty-faq-arrow-right"
          src="~@/assets/img/faq-arrow-right.png"
        />
        <img
          class="mloyalty-faq-arrow-down"
          src="~@/assets/img/faq-arrow-down.png"
        />
      </div>
      <div class="mloyalty-answer" :ref="'answer-' + faqIndex">
        {{ faq.answer }}
      </div>
    </div>
    <div class="text2">
      Не нашли ответ на свой вопрос? <br />
      <a href="#" @click.prevent="goToSupport">Свяжитесь с нами</a>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import panelBurgerTypes from '@/store/panelBurger/types'
import MixinChangeBurgerPage from '@/helpers/mixins/burger/changePage'
import { SUPPORT } from '@/helpers/const/widgetPage'

export default {
  name: 'FAQ-Page',
  mixins: [MixinChangeBurgerPage],
  data: () => ({
    faqs: [
      {
        question: 'Кто получит сертифкат после покупки?',
        answer:
          'Ссылка для скачивания сертификата придёт либо в смс, либо в один из мессенджеров тому, кто купил сертификат.'
      },
      {
        question: 'Как подарить сертификат?',
        answer:
          'Чтобы подарить сертификат необходимо всего лишь переслать ссылку для скачивания сертификата по смс, в социальные сети или в любой из мессенджеров.'
      },
      {
        question: 'Сертификат будет как-то оформлен?',
        answer: `Да, при переходе по ссылке, получатель увидит праздничную анимацию, поздравление, номинал и изображение сертификата. Также, получатель сразу сможет сохранить сертификат в любом удобном формате. Чтобы увидеть как будет оформлен сертификат, на главной странице нажмите кнопку “Предпросмотр”.`
      },
      {
        question: 'Как узнать срок действия сертификата?',
        answer: `Сертификат действует ровно 1 год с момента его покупки. Получатель сертификата увидит эту информацию при переходе по ссылке. Также, всегда можно подписаться на нашего бота и попросить его напомнить о том, что сертификат нужно успеть погасить.`
      },
      {
        question: 'Как использовать сертификат?',
        answer: `
        Для использования сертификата необходимо назвать его номер или показать штрих-код и назвать или ввести пинкод. Если номинала сертификата на хватает для оплаты всей покупки, доплатить можно наиличным или безналичным способом.
В одну покупку действует только один серитфикат.
        `
      },
      {
        question: 'В каких магазинах действует?',
        answer: `Сертификат можно использовать в любом розничном магазине сети РИВ ГОШ.`
      },
      {
        question: 'Сколько раз можно использовать?',
        answer: `Сертификат можно использовать до момента пока на нём есть средства и до момента пока он действителен. Срок действия сертификата указан на странице получения сертификата. 
Баланс сертификата можно проверить на сайте http://www.rivegauche.ru/ или узнать у нашего бота.`
      },
      {
        question: 'Не пришла ссылка на сертификат?',
        answer: `Напишите нам об этом, в разделе “Поддержка” или спросите у бота, что делать в таком случае, он поможет.`
      },
      {
        question: 'Не получается использовать сертификат?',
        answer: `Напишите нам об этом, в разделе “Поддержка” или спросите у бота, что делать в таком случае, он поможет. 
Также, Вам необходимо будет уточнить магазин и номер сертификата. `
      },
      {
        question: 'Я случайно удалил ссылку, что делать?',
        answer: `Напишите нам об этом, в разделе “Поддержка” или спросите у бота, что делать в таком случае, он поможет. 
Для получения доступа к сертификату Вам необходимо будет подтвердить свой номер телефона, на который оформлялась покупка сертификата.`
      }
    ]
  }),
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    goToSupport() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER](true)
      this.changePanelBurgerPage(SUPPORT)
    },
    toggleFaq(id) {
      let elFaq = this.$refs['mloyalty-faq-item-' + id][0]
      elFaq.classList.toggle('active')
      let el = this.$refs['answer-' + id][0]
      if (el.style.maxHeight) {
        el.style.maxHeight = null
        el.style.paddingTop = '0px'
      } else {
        el.style.maxHeight = el.scrollHeight + 10 + 'px'
        el.style.paddingTop = '10px'
      }
    }
  }
}
</script>
