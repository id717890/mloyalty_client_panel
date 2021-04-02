<template>
  <div class="ml-burger-layout">
    <a href="#" class="ml-burger" @click.prevent="toggleBurger">
      <img src="~/static/image/close.svg" alt="" />
    </a>
    <a
      v-if="showBackBtn"
      href="#"
      class="ml-burger-back"
      @click.prevent="goHome"
    >
      <v-icon>mdi-arrow-left</v-icon>
    </a>
    <transition name="ml-panel-burger-fade" mode="out-in">
      <component :is="component"></component>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import INDEX from '~/components/Burger/Pages/Index'
import PROFILE from '~/components/Burger/Pages/Profile'
import DISCOUNT from '~/components/Burger/Pages/Discount'
import ADDRESS from '~/components/Burger/Pages/Address'
import SUPPORT from '~/components/Burger/Pages/Support'
import RULES from '~/components/Burger/Pages/Rules'
import FEEDBACK from '~/components/Burger/Pages/Feedback'
import FAQ from '~/components/Burger/Pages/Faq'
import appTypes from '~/store/app/types'
import MixinChangeBurgerPage from '~/helpers/mixins/burger/changePage'
import Constants from '~/helpers/constants'

export default {
  components: {
    INDEX,
    PROFILE,
    DISCOUNT,
    ADDRESS,
    SUPPORT,
    RULES,
    FEEDBACK,
    FAQ,
  },
  mixins: [MixinChangeBurgerPage],
  computed: {
    ...mapState({
      component: (state) => state?.app?.panelBurger?.page,
    }),
    showBackBtn() {
      if (this.component !== Constants?.BURGER_PAGES?.INDEX) return true
      return false
    },
  },
  methods: {
    ...mapMutations('app', [appTypes.TOGGLE_PANEL_BURGER]),
    toggleBurger() {
      this[appTypes.TOGGLE_PANEL_BURGER]()
    },
    goHome() {
      this.changePanelBurgerPage(Constants?.BURGER_PAGES?.INDEX)
    },
  },
}
</script>

<style></style>
