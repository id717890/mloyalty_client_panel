import types from './types'

export default {
  [types.INIT_VERIFICATION_CODE_PROCESS]: (state, isLoading) => {
    state.isInitCodeInProccess = isLoading
  },
  [types.TOGGLE_PANEL_BURGER]: state => {
    state.show = !state.show
  },
  [types.SET_CONTACTS]: (state, contacts) => {
    state.contacts = contacts
  },
  [types.SET_TEST_CODE]: (state, code) => {
    state.code = code
  }
}
