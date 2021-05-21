import types from './types'

export default {
  [types.SET_BUFFER]: (state, payload) => {
    state.buffer = payload
  },
  [types.INIT_VERIFICATION_CODE_PROCESS]: (state, isLoading) => {
    state.isInitCodeInProccess = isLoading
  },
  [types.SET_PHONE]: (state, phone) => {
    state.phone = phone
  },
}
