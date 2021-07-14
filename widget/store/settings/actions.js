import ClientService from '@/api/ClientService'
import Helpers from '@/helpers/common'
import clientTypes from '@/store/client/types'
import types from './types'

export default {
  [types.SAVE_SETTINGS_PHONE_ACTION]: async ({
    rootGetters,
    rootState,
    state,
    commit,
  }) => {
    const phoneIsVerify = state?.phoneIsVerify
    if (!phoneIsVerify) {
      console.log('phone not verified')
    }
    const poscode = rootGetters['app/getPosCode']
    const operator = rootGetters['app/getOperator']
    // const sitecode = rootState?.app?.sitecode
    const token = rootGetters['app/getToken']
    const oldPhone = rootState?.client?.clientInfo?.Phone
    const newPhone = parseInt(Helpers?.getClearPhone(state?.phone, true))
    const noSendsms = false

    const requset = {
      poscode,
      token,
      operator,
      oldPhone,
      newPhone,
      noSendsms,
    }
    const { data, status } = await ClientService.changeClientPhone(requset)
    console.log(data)
    if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
      return true
    } else {
      commit(types.SET_SETTINGS_NOTIFY, data?.Message)
      return false
    }
  },
  [types.SAVE_SETTINGS_ACTION]: async ({
    rootGetters,
    rootState,
    state,
    commit,
    dispatch,
  }) => {
    const poscode = rootGetters['app/getPosCode']
    const operator = rootGetters['app/getOperator']
    const sitecode = rootState?.app?.sitecode
    const token = rootGetters['app/getToken']
    const clientData = {
      Id: rootState?.client?.clientInfo?.Id,
      Firstname: state?.fio || rootState?.client?.clientInfo?.Name,
      Birthdate: state?.birthdate || rootState?.client?.clientInfo?.Birthdate,
      // Phone: state?.phone
      //   ? parseInt(Helpers?.getClearPhone(state?.phone, true))
      //   : rootState?.client?.clientInfo?.Phone,
      Email: state?.email || rootState?.client?.clientInfo?.Email,
      Gender:
        state?.gender !== null
          ? state?.gender
          : rootState?.client?.clientInfo?.Gender,
    }
    const requset = {
      clientData,
      poscode,
      token,
      operator,
      sitecode,
    }
    const { data, status } = await ClientService.changeClient(requset)
    console.log(data)
    if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
      dispatch(`client/${clientTypes.GET_CLIENT_INFO}`, null, { root: true })
      return Promise.resolve(true)
    } else {
      commit(types.SET_SETTINGS_NOTIFY, data?.Message)
      return Promise.resolve(false)
    }
  },
  [types.CLEAR_SETTING_INPUT]: async ({ commit }) => {
    commit(types.SET_SETTINGS_FIO, null)
    commit(types.SET_SETTINGS_PHONE, null)
    commit(types.SET_SETTINGS_PHONE_IS_VERIFY, null)
    commit(types.SET_SETTINGS_EMAIL, null)
    commit(types.SET_SETTINGS_EMAIL_IS_VERIFY, null)
    commit(types.SET_SETTINGS_BIRTHDATE, null)
    commit(types.SET_SETTINGS_GENDER, null)
    commit(types.SET_SETTINGS_IS_SAVED, null)
  },
}
