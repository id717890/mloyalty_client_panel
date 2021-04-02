<template>
  <section>
    <div class="mloyalty-panel-header" v-if="!preview">
      <div class="d-flex align-center">
        <img
          class="logo"
          src="~@/assets/img/default/header-logo.png"
          @click.prevent="goToHome"
          alt=""
        />
        <a href="#" class="how-its-work ml-2">
          Дарить легко
        </a>
      </div>
      <div class="d-flex  align-center">
        <a href="#" @click.stop="togglePanelBurger" class="how-its-work mr-2">
          Как это работает
        </a>
        <img
          src="~@/assets/img/default/burger.png"
          class="burger"
          alt=""
          @click.stop="togglePanelBurger"
        />
      </div>
    </div>
    <div class="mloyalty-panel-header px-8" v-else>
      <a
        href="#"
        class="d-flex align-items-center ml-title-14-20 ml-text-grey"
        @click.prevent="goBack"
      >
        <img src="@/assets/img/arrow-left.png" alt="" class="mr-2" />
        Назад
      </a>
      <div class="ml-text-16-24-600 flex-grow-1">Предпросмотр</div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import panelBurgerTypes from '@/store/panelBurger/types'
import MixinBurgerChagePage from '@/helpers/mixins/burger/changePage'
import MixinChagePage from '@/helpers/mixins/panel/changePage'
import { HOW_ITS__WORK, START_PAGE } from '@/helpers/const/widgetPage'
import panelTypes from '@/store/panel/types'

export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  mixins: [MixinChagePage, MixinBurgerChagePage],
  computed: {},
  methods: {
    ...mapMutations('panelBurger', [panelBurgerTypes.TOGGLE_PANEL_BURGER]),
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    togglePanelBurger() {
      this[panelBurgerTypes.TOGGLE_PANEL_BURGER]()
    },
    goHowItsWork() {
      this.changePanelBurgerPage(HOW_ITS__WORK)
      this.togglePanelBurger()
    },
    goBack() {
      this.changePanelPage(START_PAGE)
    },
    goToHome() {
      this[panelTypes.TOGGLE_PANEL](false)
    }
  }
}
</script>
