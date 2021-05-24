<template>
  <v-app>
    <v-main>
      <div class="container-fluid h100 px-0">
        <div class="row h100 ma-0">
          <div
            class="col-lg-4 offset-lg-4 col-sm-12 d-flex flex-column h100 test pa-0 ml-bg1"
          >
            <Nuxt class="nuxt-router flex-grow-1" />
            <!-- <MlFooter /> -->
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import mixinInit from '~/helpers/mixins/init'

export default {
  mixins: [mixinInit],
  middleware: ['sitecode', 'jwtauth', 'widgetConfig'],
  head() {
    return {
      bodyAttrs: {
        class: 'ml-bg1',
      },
    }
  },
}
</script>
