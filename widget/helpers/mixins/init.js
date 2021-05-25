import { mapState } from 'vuex'
import appTypes from '~/store/app/types'

export default {
  computed: {
    ...mapState({
      code: (state) => state?.app?.sitecode,
    }),
  },
  mounted() {
    document?.getElementById('app')?.classList?.add('ml-bg1')
    window?.xprops?.onProps(async (newProps) => {
      const code = newProps?.code
      if (code && code !== this.code) {
        console.log('PROPS EVENT', newProps)
        await this.$store?.commit(`app/${appTypes.SET_SITECODE}`, code)
        this.$router.push({ name: 'index' })
      }
    })
  },
}
