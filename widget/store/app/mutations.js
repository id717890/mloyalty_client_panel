import types from './types'

export default {
  [types.SET_MAIN_WIDGET_CONFIG]: (state, payload) => {
    state.mainWidgetConfig = payload
  },
  [types.SET_SITECODE]: (state, payload) => {
    state.sitecode = payload
  },
  [types.SET_METADATA]: (state, payload) => {
    state.metadata = payload
  },
  [types.SET_SOURCEURL]: (state, payload) => {
    state.sourceurl = payload
  },
  [types.SET_LOADING]: (state, loading) => {
    state.loading = loading
  },
  [types.SET_CURRENT_BURGER_PAGE]: (state, page) => {
    state.panelBurger.page = page
  },
  [types.TOGGLE_PANEL_BURGER]: (state) => {
    state.panelBurger.show = !state.panelBurger.show
  },
}
