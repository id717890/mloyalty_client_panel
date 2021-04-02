<template>
  <div class="mloyalty-panel-burger-layout">
    <burger-header :show="!isHomePage" />
    <div class="flex-grow-1 mloyalty-panel-burger-body">
      <v-btn
        v-if="isHomePage"
        icon
        large
        text
        class="close-btn"
        @click="togglePanelBurger"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <transition name="panel-fade" mode="out-in">
        <div v-if="loading" class="h100 d-flex justify-center">
          <div class="pb flex-grow-1 d-flex justify-center align-center">
            <MlLoading />
          </div>
        </div>
        <component v-else :is="component"></component>
      </transition>
    </div>
    <!-- <burger-footer v-if="!isHomePage" /> -->
  </div>
</template>

<script>
import burgerHeader from './Header'
import burgerFooter from './Footer'
import burgerTypes from '../../store/panelBurger/types'
import { HOME_PAGE } from '../../helpers/const/widgetPage'
import { mapActions, mapMutations, mapState } from 'vuex'
import home from './Pages/Home'
import MlLoading from '@/components/UI/MlLoading'
import MixinChagePage from '@/helpers/mixins/burger/changePage'
import panelBurgerTypes from '@/store/panelBurger/types'
import faq from './Pages/FAQ'
import howItsWork from './Pages/HowItsWork'
import offer from './Pages/Offer'
import support from './Pages/Support'

export default {
  components: {
    burgerHeader,
    burgerFooter,
    home,
    faq,
    howItsWork,
    offer,
    support,
    MlLoading
  },
  mixins: [MixinChagePage],
  computed: {
    ...mapState({
      component: state => state.panelBurger.page,
      loading: state => state.app.loading
    }),
    isHomePage() {
      return this.component === HOME_PAGE
    }
  },
  watch: {
    component(value) {}
  },
  mounted() {
    this.changePanelBurgerPage(HOME_PAGE)
  },
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    }
  }
}
</script>
