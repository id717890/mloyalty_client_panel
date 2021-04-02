<template>
  <div class="ml-burger-index">
    <ul class="ml-burger-index-menu">
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToProfile">
          Профиль
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToDiscount">
          Акции
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToAddress">
          Адреса
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToSupport">
          Поддержка
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToRules">
          Правила
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToFeedback">
          Написать отзыв
        </a>
      </li>
      <li>
        <a class="ml-text-20-22-600" href="#" @click.prevent="goToFaq">
          Частые вопросы
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import MixinChangeBurgerPage from '~/helpers/mixins/burger/changePage'
import Constants from '~/helpers/constants'

export default {
  mixins: [MixinChangeBurgerPage],
  methods: {
    goToProfile() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.PROFILE)
    },
    goToDiscount() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.DISCOUNT)
    },
    goToAddress() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.ADDRESS)
    },
    goToFaq() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.FAQ)
    },
    goToFeedback() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.FEEDBACK)
    },
    goToSupport() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.SUPPORT)
    },
    goToRules() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.RULES)
    },
  },
}
</script>

<style></style>
