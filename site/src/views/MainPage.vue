<template>
  <v-app>
    <v-main>
      <router-view name="main"></router-view>
      <v-navigation-drawer
        style="overflow: visible; height: 100% !important;"
        :width="config.panelWidth"
        :value="showPanel"
        app
        stateless
        temporary
        touchless
        right
      >
        <v-btn
          fab
          small
          elevation="0"
          color="#F0F0F0"
          class="ml-close-panel-btn-mobile hidden-md-and-up"
          @click.stop="togglePanel"
          v-if="isShowMobileCloseBtn"
        >
          <v-icon color="#4D4D4D">mdi-close</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          color="#F0F0F0"
          class="ml-close-panel-btn hidden-sm-and-down"
          @click.stop="togglePanel"
        >
          <v-icon color="#4D4D4D">mdi-close</v-icon>
        </v-btn>
        <div id="widget-wrapper" ref="widget-wrapper"></div>
      </v-navigation-drawer>

      <v-navigation-drawer
        style="overflow: visible; height: 100% !important;"
        :width="config.panelWidth"
        :value="showPanelBalance"
        app
        stateless
        temporary
        touchless
        right
      >
        <v-btn
          fab
          small
          elevation="0"
          color="#F0F0F0"
          class="ml-close-panel-btn-mobile hidden-md-and-up"
          @click.stop="togglePanelBalance"
        >
          <v-icon color="#4D4D4D">mdi-close</v-icon>
        </v-btn>
        <v-btn
          fab
          small
          color="#F0F0F0"
          class="ml-close-panel-btn hidden-sm-and-down"
          @click.stop="togglePanelBalance"
        >
          <v-icon color="#4D4D4D">mdi-close</v-icon>
        </v-btn>
        <div id="widget-balance-wrapper" ref="widget-balance-wrapper"></div>
        <!-- <balance ref="balance" /> -->
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'

export default {
  computed: {
    ...mapState({
      showPanel: state => state.panel.show,
      showPanelBalance: state => state.panel.showPanelBalance,
      config: state => state.app.config,
      isTest: state => state?.app?.testMode ?? true
    })
  },
  data() {
    return {
      counter: 1,
      code: 'test-code',
      isShowMobileCloseBtn: true,
      drawer: false,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' },
        { title: 'About', icon: 'mdi-forum' }
      ]
    }
  },
  methods: {
    ...mapMutations('panel', [
      panelTypes.TOGGLE_PANEL,
      panelTypes.TOGGLE_PANEL_BALANCE
    ]),

    togglePanel() {
      const isShow = !this.showPanel
      // if (isShow === true) {
      //   this.initWidget()
      // }
      // if (this.showPanel === false) {
      // }
      this[panelTypes.TOGGLE_PANEL](isShow)
    },
    togglePanelBalance() {
      this[panelTypes.TOGGLE_PANEL_BALANCE](!this.showPanelBalance)
    },
    // Render the component
    isMobile() {
      // credit to Timothy Huang for this regex test:
      // https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true
      } else {
        return false
      }
    },
    initWidget() {
      this.$refs['widget-wrapper'].innerHTML = null
      MloyaltyWidget({
        // url: 'http://lkvidget.lctest.ru/',
        url: 'http://localhost:3000',
        code: 'Личный кабинет',
        // code: 'empty',
        // code: '*',
        metadata: {
          // client_mloyalty: 2
          client_mloyalty: 264658
          // client_ishop: 1234
        },
        onHide: value => {
          this.$set(this, 'isShowMobileCloseBtn', !value)
        }
      }).render('#widget-wrapper')
    },
    setInitialize() {
      if (this.isTest) {
        setTimeout(() => {
          this.initWidget()
        }, 500)
      }
    }
  },
  watch: {
    showPanelBalance(value) {
      if (value) {
        // this.$refs.balance.resetForm()
      }
    }
  },
  mounted() {
    this.setInitialize()
    // this[panelTypes.TOGGLE_PANEL](true)
    // console.log(this.isMobile())
    // setTimeout(() => {
    //   let newVal = this.counter + 1
    //   this.$set(this, 'counter', newVal)
    //   console.log('SITE', this.counter)
    //   console.log('SITE', window.xchild)
    //   // this.testFunc()
    // }, 3000)
  }
}
</script>
