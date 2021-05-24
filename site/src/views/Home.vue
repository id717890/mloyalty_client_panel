<template>
  <div class="d-flex flex-grow-1 justify-content-center align-items-center">
    <div v-if="isTest">
      <a
        href="#"
        class="ml-silver-btn"
        @click.prevent="togglePanel"
        style="font-size: 14px;"
      >
        <v-icon>mdi-check</v-icon>
        Личный кабинет
      </a>
    </div>
    <template v-else>
      <div class="d-flex flex-column">
        <button
          type="button"
          class="ml-silver-btn w100 mb-3"
          style="font-size: 16px;"
          @click="openSidePanel"
        >
          <v-icon>mdi-bag-checked</v-icon>
          Личный кабинет
        </button>
        <button
          type="button"
          class="ml-silver-btn w100 mb-3"
          style="font-size: 16px;"
          @click="openSidePanelEmpty"
        >
          <v-icon>mdi-bag-checked</v-icon>
          empty
        </button>
        <button
          type="button"
          class="ml-silver-btn w100 mb-3"
          style="font-size: 16px;"
          @click="openSidePanelDefault"
        >
          <v-icon>mdi-bag-checked</v-icon>
          *
        </button>
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import panelTypes from '@/store/panel/types'
export default {
  name: 'Home',
  computed: {
    ...mapState({
      isTest: state => state?.app?.testMode ?? true
    })
  },
  methods: {
    ...mapMutations('panel', [panelTypes.TOGGLE_PANEL]),
    // updateProps() {
    //   widgetZoidComponent.updateProps({ code: 12345 })
    // },
    openSidePanel() {
      MloyaltyWidget.open('Личный кабинет')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    openSidePanelDefault() {
      MloyaltyWidget.open('*')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    openSidePanelEmpty() {
      MloyaltyWidget.open('empty')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    togglePanel() {
      // MloyaltyWidget.open('Личный кабинет')
      // widgetZoidComponent.updateProps({ code: 'Личный кабинет' })
      this[panelTypes.TOGGLE_PANEL](true)
    }
  }
}
</script>
