<template>
  <v-app>
    <v-container fill-height fluid>
      <div class="text-center" v-if="loading">
        <v-progress-circular
          :size="50"
          indeterminate
          color="red"
        ></v-progress-circular>
      </div>
    </v-container>
  </v-app>
</template>

<script>
import appTypes from '../store/app/types'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      loading: state => state.app.loading
    })
  },
  methods: {
    ...mapMutations('app', [appTypes.SET_LOADING_APP]),
    ...mapActions('app', [appTypes.INIT_TEMPLATE])
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$route.params)
      console.log(this.$route.query)
    }, 1000)

    this[appTypes.SET_LOADING_APP](true)
    this[appTypes.INIT_TEMPLATE](this.$route.params.code).then(() => {
      setTimeout(() => {
        // this.$router.push('/')
      }, 2000)
    })
  }
}
</script>

<style></style>
