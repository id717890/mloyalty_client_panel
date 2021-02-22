import types from './types'

export default {
  [types.SET_CURRENT_BURGER_PAGE]: (state, page) => {
    state.panelBurger.page = page
  },
  [types.TOGGLE_PANEL_BURGER]: (state) => {
    state.panelBurger.show = !state.panelBurger.show
  },
}
