import VerifyService from '@/api/VerifyService'
import types from './types'
// import router from '~/router'

export default {
  async [types.REQUEST_CODE](
    { state, rootState, commit, getters, rootGetters },
    { phone, communicationtype, codeType }
  ) {
    const sitecode = rootGetters['app/getSiteCode']
    const operator = rootState?.auth?.decodeJwt?.oper
    const token = rootState?.auth?.decodeJwt?.token
    // const name = 'Zamir'
    const email = 'jusupovz@gmail.com'
    // const phone = payload?.phone
    // const communicationtype = payload?.communicationType
    const data = {
      sitecode,
      operator,
      token,
      // name,
      email,
      phone,
      communicationtype,
      codeType,
    }
    return VerifyService.requestCode(data)
      .then((response) => {
        if (
          response?.status === 200 &&
          !response?.data?.Message &&
          response?.data?.ErrorCode === 0
        ) {
          return Promise.resolve()
        } else {
          console.log('error status')
          this.$router.push({
            name: 'Errors-400',
            params: { message: 'Ошибка при отправке кода на телефон' },
          })
        }
      })
      .catch((error) => {
        console.log('error catch')
        this.$router.push({
          name: 'Errors-400',
          params: {
            message: 'Ошибка при отправке кода на телефон',
            subMessage: error,
          },
        })
        // router.push({
        //   name: 'Error',
        //   params: {
        //     message: 'Ошибка при отправке кода на телефон',
        //     subMessage: error,
        //   },
        // })
      })
  },
  [types.SEND_VERIFICATIONCODE_VIA_SMS]: async (
    { state, rootState, commit, getters, rootGetters },
    payload
  ) => {
    const sitecode = rootGetters['app/getSiteCode']
    const operator = rootState?.auth?.decodeJwt?.oper
    const token = rootState?.auth?.decodeJwt?.token
    const communicationtype = 1
    const { code } = payload
    const { phone } = payload
    const data = {
      sitecode,
      operator,
      token,
      phone,
      communicationtype,
      code,
    }
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    return VerifyService.sendCode(data)
      .then((response) => {
        if (
          response?.status === 200 &&
          !response?.data?.Message &&
          response?.data?.ErrorCode === 0
        ) {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
      .catch(() => Promise.resolve(false))
      .finally(() => {
        setTimeout(
          () => commit(types.INIT_VERIFICATION_CODE_PROCESS, false),
          500
        )
      })
  },
  [types.SEND_VERIFICATIONCODE_VIA_MESSANGER]: async (
    { state, rootState, commit, getters, rootGetters },
    payload
  ) => {
    const sitecode = rootGetters['app/getSiteCode']
    const operator = rootState?.auth?.decodeJwt?.oper
    const token = rootState?.auth?.decodeJwt?.token
    const communicationtype = 1
    const { code } = payload
    const { phone } = payload
    const data = {
      sitecode,
      operator,
      token,
      phone,
      communicationtype,
      code,
    }
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    return VerifyService.sendCode(data)
      .then((response) => {
        if (
          response?.status === 200 &&
          !response?.data?.Message &&
          response?.data?.ErrorCode === 0
        ) {
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
      .catch(() => Promise.resolve(false))
      .finally(() => {
        setTimeout(
          () => commit(types.INIT_VERIFICATION_CODE_PROCESS, false),
          500
        )
      })
  },
}
