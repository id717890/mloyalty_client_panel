<template>
  <div class="d-flex flex-grow-1 justify-content-center align-items-center">
    <div v-if="isTest">
      <a
        href="#"
        class="ml-silver-btn"
        @click.prevent="togglePanel"
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
      MloyaltyWidget.open('Купить')
      // MloyaltySidePanel.show('mloyalty-side-panel-widget')
    },
    togglePanel() {
      this[panelTypes.TOGGLE_PANEL](true)
    }
  }
}
</script>
