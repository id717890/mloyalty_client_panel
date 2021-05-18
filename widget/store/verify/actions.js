import VerifyService from '@/api/VerifyService'
import types from './types'
import clientTypes from '~/store/client/types'
import errorHandler from '~/helpers/errorHandler'

export default {
  async [types.REQUEST_CODE]({ rootState, rootGetters }, { phone }) {
    const sitecode = rootGetters['app/getSiteCode']
    const operator = rootGetters['app/getOperator']
    const partner = rootGetters['app/getPartner']
    const poscode = rootGetters['app/getPosCode']
    const token = rootGetters['app/getToken']
    const codetype = 6 //  тип кода подтверждения, который запрашивается (6 значит авторизация в виджете лояльности)
    const data = {
      sitecode,
      token,
      operator,
      partner,
      poscode,
      phone,
      codetype,
    }
    return VerifyService.requestCodeForClient(data)
      .then((response) => {
        if (
          response?.status === 200 &&
          !response?.data?.Message &&
          response?.data?.ErrorCode === 0
        ) {
          return Promise.resolve()
        } else {
          console.log('error status')
          return errorHandler.throw(response?.data?.Message)
        }
      })
      .catch((error) => {
        console.log('error catch')
        return errorHandler.throw(error)
      })
  },
  [types.SEND_VERIFICATIONCODE_VIA_SMS]: async (
    { commit, dispatch },
    payload
  ) => {
    const { code, phone } = payload
    const data = {
      phone,
      code,
    }
    commit(types.INIT_VERIFICATION_CODE_PROCESS, true)
    return VerifyService.sendCodeForClient(data)
      .then(async (response) => {
        if (
          response?.status === 200 &&
          !response?.data?.Message &&
          response?.data?.ErrorCode === 0
        ) {
          const clientId = response?.data?.Client
          if (!clientId) {
            console.log('CLIENT ID IS NULL', phone)
            await dispatch(
              `client/${clientTypes.CLIENT_CREATE_ACTION_2}`,
              phone,
              {
                root: true,
              }
            )
          } else {
            console.log('await SET_CLIENT_ID')
            commit(
              `client/${clientTypes.SET_CLIENT_ID}`,
              response?.data?.Client,
              {
                root: true,
              }
            )
          }

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
