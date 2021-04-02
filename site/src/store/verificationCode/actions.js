import types from './types'

export default {
  [types.SEND_VERIFICATIONCODE_VIA_SMS]: async ({ commit, state }, payload) => {
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    const fakePromise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true })
        // if (payload === state.code) {
        //   resolve({ success: true })
        // } else {
        //   resolve({ success: false })
        // }
        commit(types.INIT_VERIFICATION_CODE_PROCESS, false)
      }, 1000)
    })
    return fakePromise
  },
  [types.SEND_VERIFICATIONCODE_VIA_MESSANGER]: async (
    { commit, state },
    payload
  ) => {
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    const fakePromise = new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true })
        // if (payload === state.code) {
        //   resolve({ success: true })
        // } else {
        //   resolve({ success: false })
        // }
        commit(types.INIT_VERIFICATION_CODE_PROCESS, false)
      }, 1000)
    })
    return fakePromise
  }
}
