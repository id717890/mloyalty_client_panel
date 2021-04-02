<template>
  <div class="pb pt-0" style="margin-top: -15px">
    <dir class="row">
      <div class="col-12">
        <ul class="home-menu">
          <li>
            <a href="#" @click.prevent="goHowItsWork">Как это работает</a>
          </li>
          <li><a href="#" @click.prevent="goFAQ">Частые вопросы</a></li>
          <li><a href="#" @click.prevent="goOffer">Оферта</a></li>
          <li><a href="#" @click.prevent="goSupport">Поддержка</a></li>
        </ul>
        <hr class="ml-delimeter" />
      </div>
      <div class="col-12">
        <img
          class="logo"
          src="~@/assets/img/default/header-logo-color.png"
          alt=""
        />
      </div>
      <div class="col-12">
        <div class="text5 mb-3">8 (800) 333-20-20</div>
        <div class="text5 mb-3">info@daritlegko.ru</div>
        <div class="text5 mb-3">daritlegko.ru</div>
      </div>
      <div class="col-12">
        <div class="d-flex ">
          <a href="#" class="mloyalty-social-btn">
            <img src="~@/assets/img/default/social-icon-vk.png" alt="" />
          </a>
          <a href="#" class="mloyalty-social-btn">
            <img src="~@/assets/img/default/social-icon-facebook.png" alt="" />
          </a>
          <a href="#" class="mloyalty-social-btn">
            <img src="~@/assets/img/default/social-icon-ok.png" alt="" />
          </a>
        </div>
      </div>
    </dir>
  </div>
</template>

<script>
import MixinChagePage from '@/helpers/mixins/burger/changePage'
import {
  HOME_PAGE,
  FAQ_PAGE,
  HOW_ITS__WORK,
  SUPPORT,
  OFFER
} from '@/helpers/const/widgetPage'

export default {
  name: 'Home-Page',
  components: {},
  mixins: [MixinChagePage],
  methods: {
    goFAQ() {
      this.changePanelBurgerPage(FAQ_PAGE)
    },
    goHowItsWork() {
      this.changePanelBurgerPage(HOW_ITS__WORK)
    },
    goOffer() {
      this.changePanelBurgerPage(OFFER)
    },
    goSupport() {
      this.changePanelBurgerPage(SUPPORT)
    }
  }
}
</script>

<style></style>
