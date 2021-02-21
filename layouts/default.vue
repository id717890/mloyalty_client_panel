<template>
  <v-app>
    <v-main>
      <div class="container-fluid h100">
        <div class="row h100">
          <div
            class="col-lg-4 offset-lg-4 col-sm-12 d-flex flex-column h100 test"
          >
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
        app
        temporary
        right
      >
        open
      </v-navigation-drawer>
    </v-main>
  </v-app>
</template>

<script>
export default {
  components: {},
  directives: {},
  data: () => ({
    showPanel: false,
  }),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
}
</script>
