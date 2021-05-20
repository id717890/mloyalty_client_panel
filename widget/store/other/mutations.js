import types from './types'

export default {
  [types.SET_PROMO]: (state, payload) => {
    state.promo = payload
  },
}
