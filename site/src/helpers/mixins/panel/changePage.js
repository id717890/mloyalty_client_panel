import { mapMutations } from 'vuex'
import panelTypes from '@/store/panel/types'

export default {
  methods: {
    ...mapMutations('panel', [panelTypes.CURRENT_PAGE_SET]),
    changePanelPage(page) {
      this[panelTypes.CURRENT_PAGE_SET](page)
    }
  }
}
