import types from './types'

export default {
  [types.CHANGE_CLIENT_NAME]: (state, name) => {
    state.clientInfo.Name = name
  },
  [types.SET_CLIENT_ID]: (state, payload) => {
    state.clientId = payload
  },
  [types.SET_CLIENT_INFO]: (state, payload) => {
    state.clientInfo = payload
  },
  [types.SET_CLIENT_CARD]: (state, payload) => {
    state.clientCard = payload
  },
  [types.SET_CLIENT_CHEQUES]: (state, payload) => {
    state.clientCheques = payload
  },
  [types.SET_CLIENT_BONUSES]: (state, payload) => {
    state.clientBonuses = payload
  },
}
