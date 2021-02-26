import types from './types'

export default {
  [types.SET_CLIENT_INFO]: (state, payload) => {
    state.clientInfo = payload
  },
  [types.SET_CLIENT_CARD]: (state, payload) => {
    state.clientCard = payload
  },
  [types.SET_CLIENT_CHEQUES]: (state, payload) => {
    state.clientCheques = payload
  },
}
