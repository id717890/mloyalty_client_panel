import types from './types'

export default {
  [types.SAVE_SETTINGS_ACTION]: async ({ commit }, payload) => {
    console.log(payload)
  },
}
