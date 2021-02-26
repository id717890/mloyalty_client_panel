import types from './types'

export default {
  [types.SET_APP_LOADING]: async ({ commit }, payload) => {
    commit(types.SET_LOADING, payload)
  },
}
