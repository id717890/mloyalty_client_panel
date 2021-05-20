import types from './types'
import SupportService from '~/api/SupportService'

export default {
  [types.NEW_SUPPORT_REQUEST_ACTION]: async (
    { rootGetters, rootState },
    payload
  ) => {
    try {
      payload.sitecode = rootGetters['app/getSiteCode']
      payload.operator = rootState?.auth?.decodeJwt?.oper
      payload.token = rootState?.auth?.decodeJwt?.token
      console.log(payload)
      const { data, status } = await SupportService.createRequestToSupport(
        payload
      )
      if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
        return Promise.resolve(true)
      } else {
        return Promise.resolve(false)
      }
    } catch (error) {
      console.log('NEW_SUPPORT_REQUEST_ACTION', error)
      return Promise.resolve(false)
    }
  },
}
