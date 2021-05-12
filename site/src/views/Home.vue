<template>
  <div class="d-flex flex-grow-1 justify-content-center align-items-center">
    <div v-if="isTest">
      <a
        href="#"
        class="ml-silver-btn"
        @click.prevent="newCertificate"
        style="font-size: 14px;"
      >
        Личный кабинет
      </a>
    </div>
    <div v-else>
      <button
        type="button"
        class="ml-silver-btn w100"
        style="font-size: 14px;"
        @click="openSidePanel"
      >
        Личный кабинет
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
export default {
  name: 'Home',
  components: {},
  computed: {
    ...mapState({
      showPanelBalance: state => state.panel.showPanelBalance,
      isTest: state => state?.app?.testMode ?? true
    })
  },
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    updateProps() {
      widgetZoidComponent.updateProps({ code: 12345 })
    },
    openSidePanel() {
      MloyaltyWidget.open('Купить')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    openSidePanel2() {
      MloyaltyWidget.open('Баланс')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    openCertificateOwnere() {
      const widgetUrl = `${process.env.VUE_APP_WIDGET_URL}/owner?code=Получить&id=1234567890`
      window.open(widgetUrl, '_blank')
    },
    togglePanelBalance() {
      console.log(this.showPanelBalance)
      this[panelTypes.TOGGLE_PANEL_BALANCE](!this.showPanelBalance)
    },
    openQuiz() {
      Marquiz.showModal('5fda3289c9b57700443842f2')
    },
    // togglePanel() {
    //   this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    // },
    newCertificate() {
      this[panelTypes.TOGGLE_PANEL](true)
      // this.changePanelPage(START_PAGE)
    }
  }
}
</script>
