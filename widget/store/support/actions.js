import types from './types'
import SupportService from '~/api/SupportService'

export default {
  [types.NEW_SUPPORT_REQUEST_ACTION]: async (
    { rootGetters, rootState },
    payload
  ) => {
    const operator = rootGetters['app/getOperator']
    const token = rootGetters['app/getToken']
    const partner = rootGetters['app/getPartner']
    const sitecode = rootState?.app?.sitecode
    const direction = 2 // тип продукта (направление), по которому идёт запрос; 1 - значит лояльность
    const type = 4 // 4 - это значит обращение в поддержку
    const formname = 'Поддержка_Виджет' // наименование формы
    const leadname = rootState?.client?.clientInfo?.Name
    const phone = rootState?.client?.clientInfo?.Phone
    const client = rootState?.client?.clientInfo?.Id
    const email = rootState?.client?.clientInfo?.Email
    const requset = {
      operator,
      partner,
      token,
      sitecode,
      direction,
      type,
      leadname,
      phone,
      formname,
      client,
      email,
      ...payload,
    }
    try {
      const { data, status } = await SupportService.createRequestToSupport(
        requset
      )
      if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.log('NEW_SUPPORT_REQUEST_ACTION', error)
      return false
    }
  },
}
