import { mapMutations } from 'vuex'
import burgerTypes from '@/store/panelBurger/types'

export default {
  methods: {
    ...mapMutations('panelBurger', [burgerTypes.CURRENT_BURGER_PAGE_SET]),
    changePanelBurgerPage(page) {
      this[burgerTypes.CURRENT_BURGER_PAGE_SET](page)
    }
  }
}
