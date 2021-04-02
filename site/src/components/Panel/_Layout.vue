<template>
  <div class="mloyalty-panel-layout">
    <panel-header :preview="isPreview" v-if="isShowFooterHeader" />
    <v-btn
      fab
      small
      elevation="0"
      color="#F0F0F0"
      class="ml-close-panel-btn-mobile hidden-md-and-up"
      :class="{ 'ml-close-panel-btn-mobile-balance': isBalance }"
      @click.stop="togglePanel"
      v-if="!isPreview"
    >
      <v-icon color="#4D4D4D">mdi-close</v-icon>
    </v-btn>
    <div
      class="flex-grow-1 mloyalty-panel-body"
      :class="{
        'mloyalty-no-padding-top-bottom': isBalance || isPreview
      }"
    >
      <transition name="panel-fade" mode="out-in">
        <div v-if="loading" class="h100 d-flex justify-center">
          <div class="pb flex-grow-1 d-flex justify-center align-center">
            <MlLoading />
          </div>
        </div>
        <component v-else :is="component"></component>
      </transition>
    </div>
    <panel-footer v-if="isShowFooterHeader && !isPreview" />
    <!-- <certificate-footer v-if="isPreview" /> -->
  </div>
</template>

<script>
import panelHeader from './Header'
import panelFooter from './Footer'
import certificateFooter from '../CertificateFooter'
import panelTypes from '../../store/panel/types'
import {
  START_PAGE,
  BASKET_PAGE,
  SENDING_PAGE,
  CONFIRMING_PAGE,
  PREVIEW_PAGE,
  SUCCESS_PAGE,
  BALANCE_PAGE
} from '../../helpers/const/widgetPage'
import { mapActions, mapMutations, mapState } from 'vuex'
import firstCertificate from './Pages/NewCertificate'
import basket from './Pages/Basket'
import sending from './Pages/Sending'
import confirming from './Pages/Confirming'
import preview from './Pages/PreviewAnimation'
import success from './Pages/Success'
import balance from './Pages/Balance'
import MlLoading from '@/components/UI/MlLoading'
import certificateTypes from '@/store/certificate/types'
import basketTypes from '@/store/basket/types'

export default {
  components: {
    panelHeader,
    panelFooter,
    firstCertificate,
    basket,
    sending,
    confirming,
    preview,
    success,
    MlLoading,
    certificateFooter,
    balance
  },
  computed: {
    ...mapState({
      component: state => state.panel.page,
      loading: state => state.app.loading
    }),
    isPreview() {
      return this.component === PREVIEW_PAGE
    },
    isBalance() {
      return this.component === BALANCE_PAGE
    },
    isShowFooterHeader() {
      if (this.component === BALANCE_PAGE) return false
      return true
      // return this.component === PREVIEW_PAGE || this.component === BALANCE_PAGE
    }
  },
  watch: {
    component(value) {
      if (value !== START_PAGE) this[basketTypes.SET_CURRENT_CERTIFICATE](null)
    }
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.CURRENT_PAGE_SET,
      panelTypes.TOGGLE_PANEL
    ]),
    ...mapActions('certificate', [certificateTypes.GET_CERTIFICATE_OPTIONS]),
    ...mapMutations('basket', [basketTypes.SET_CURRENT_CERTIFICATE]),
    ...mapState({
      showPanel: state => state.panel.show
    }),
    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](!this.showPanel)
    }
  },
  mounted() {
    this[certificateTypes.GET_CERTIFICATE_OPTIONS]()

    this[panelTypes.CURRENT_PAGE_SET](START_PAGE)
  }
}
</script>
