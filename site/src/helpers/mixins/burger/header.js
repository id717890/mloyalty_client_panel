import {
  FAQ_PAGE,
  HOW_ITS__WORK,
  OFFER,
  SUPPORT
} from '@/helpers/const/widgetPage'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      component: state => state.panelBurger.page
    }),
    title() {
      switch (this.component) {
        case FAQ_PAGE:
          return 'Частые вопросы'
        case HOW_ITS__WORK:
          return 'Как это работает'
        case OFFER:
          return 'Оферта'
        case SUPPORT:
          return 'Поддержка'
      }
    }
  }
}
