import types from './types'

export default {
  [types.SET_LOADING](state, isLoading) {
    state.loading = isLoading
  }
}
