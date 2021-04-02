<template>
  <div class="d-flex flex-grow-1 justify-content-center align-items-center">
    <div v-if="test">
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
import verificationTypes from '@/store/verificationCode/types'
import { START_PAGE } from '@/helpers/const/widgetPage'
import MixinChangePanelPage from '@/helpers/mixins/panel/changePage'

export default {
  name: 'Home',
  components: {},
  mixins: [MixinChangePanelPage],
  data: () => ({
    test: false
  }),
  computed: {
    ...mapState({
      showPanelBalance: state => state.panel.showPanelBalance
    })
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.TOGGLE_PANEL,
      panelTypes.TOGGLE_PANEL_BALANCE
    ]),
    ...mapMutations('verificationCode', [verificationTypes.SET_TEST_CODE]),
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
      this.changePanelPage(START_PAGE)
    },
    balance() {
      this.togglePanelBalance()
    },
    balanceWidget() {}
  }
}
</script>
