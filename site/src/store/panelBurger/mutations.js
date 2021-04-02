import types from './types'

export default {
  [types.CURRENT_BURGER_PAGE_SET]: (state, page) => {
    state.page = page
  },
  [types.TOGGLE_PANEL_BURGER]: state => {
    state.show = !state.show
  }
}
