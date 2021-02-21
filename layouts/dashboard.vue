<template>
  <v-app class="ml-dashboard-layout">
    <v-main class="ml-dashboard-layout">
      <div class="container-fluid h100">
        <div class="row h100">
          <div
            class="col-lg-4 offset-lg-4 col-sm-12 d-flex flex-column h100 test"
          >
            <a
              href="#"
              class="ml-burger"
              @click.prevent="showPanel = !showPanel"
            >
              <img src="~/static/image/burger.svg" alt="" />
            </a>

            <!-- Default layout -->
            <!-- <v-btn @click="showPanel = !showPanel">Open panel</v-btn> -->
            <Nuxt />
          </div>
        </div>
      </div>
      <v-navigation-drawer
        v-model="showPanel"
        class="elevation-0"
        hide-overlay
        width="100%"
        app
        temporary
        right
      >
        <a href="#" class="ml-burger" @click.prevent="showPanel = !showPanel">
          Закрыть
        </a>
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  directives: {},
  middleware: 'verify',
  data: () => ({
    showPanel: false,
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
