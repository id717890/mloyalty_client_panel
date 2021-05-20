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
import { mapState } from 'vuex'
import appTypes from '~/store/app/types'

export default {
  middleware: ['jwtauth', 'widgetConfig'],
  head() {
    return {
      bodyAttrs: {
        class: 'ml-bg1',
      },
    }
  },
  computed: {
    ...mapState({
      code: (state) => state?.app?.sitecode,
    }),
  },
  mounted() {
    document.getElementById('app').classList.add('ml-bg1')
    window?.xprops?.onProps(async (newProps) => {
      const code = newProps?.code
      if (code && code !== this.code && code !== '*') {
        console.log('onProps event', newProps)
        await this.$store?.commit(`app/${appTypes.SET_SITECODE}`, code)
      }
    })
  },
}
</script>
