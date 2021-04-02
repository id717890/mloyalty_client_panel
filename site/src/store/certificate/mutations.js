import types from './types'

export default {
  [types.SET_CERTIFICATE_OPTIONS](state, options) {
    state.options = options
  },
  [types.STORE_CURRENT_CERIFICATE](state, certificate) {
    state.selectedCertificate = certificate
  }
}
