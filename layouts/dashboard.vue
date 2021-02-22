<template>
  <v-app class="ml-dashboard-layout">
    <v-main class="ml-dashboard-layout">
      <div class="container-fluid h100">
        <div class="row h100">
          <div
            class="col-lg-4 offset-lg-4 col-sm-12 d-flex flex-column h100 test"
          >
            <a href="#" class="ml-burger" @click.prevent="toggleBurger">
              <img src="~/static/image/burger.svg" alt="" />
            </a>

            <!-- Default layout -->
            <Nuxt />
          </div>
        </div>
      </div>
      <v-navigation-drawer
        :value="burgerShow"
        class="elevation-0"
        hide-overlay
        :width="burgerWidth"
        app
        stateless
        temporary
        right
      >
        <burger-layout />
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import appTypes from '~/store/app/types'
import burgerLayout from '~/components/Burger/Layout'

export default {
  components: { burgerLayout },
  directives: {},
  middleware: 'verify',
  data: () => ({}),
  computed: {
    ...mapState({
      burgerWidth: (state) => state?.app?.panelBurger?.width,
      burgerShow: (state) => state?.app?.panelBurger?.show,
    }),
  },
  mounted() {},
  methods: {
    ...mapMutations('app', [appTypes.TOGGLE_PANEL_BURGER]),
    toggleBurger() {
      this[appTypes.TOGGLE_PANEL_BURGER]()
    },
  },
}
</script>
