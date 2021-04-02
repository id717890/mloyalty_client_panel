import types from './types'

export default {
  [types.CURRENT_PAGE_SET]: (state, page) => {
    state.page = page
  },
  [types.TOGGLE_PANEL]: (state, isShow) => {
    console.log(isShow)
    state.show = isShow
  },
  [types.TOGGLE_PANEL_BALANCE]: (state, isShow) => {
    state.showPanelBalance = isShow
  }
}
