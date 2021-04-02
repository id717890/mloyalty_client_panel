import { mapMutations } from 'vuex'
import appTypes from '~/store/app/types'

export default {
  methods: {
    ...mapMutations('app', [appTypes.SET_CURRENT_BURGER_PAGE]),
    changePanelBurgerPage(page) {
      this[appTypes.SET_CURRENT_BURGER_PAGE](page)
    },
  },
}
