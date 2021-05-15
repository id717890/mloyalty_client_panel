import types from './types'
import ConfigService from '~/api/ConfigService'

export default {
  [types.GET_WIDGET_MAIN_CONFIG_ACTION]: async ({
    commit,
    state,
    getters,
    rootState,
  }) => {
    const { sourceurl, sitecode } = state
    const client = getters.getClientMloyalty
    const operator = rootState?.auth?.decodeJwt?.oper
    const token = rootState?.auth?.decodeJwt?.token
    const request = {
      sourceurl,
      sitecode,
      client,
      operator,
      token,
    }
    try {
      const { data, status } = await ConfigService.getMainWidgetConfig(request)
      if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
        commit(types.SET_MAIN_WIDGET_CONFIG, data)
      }
    } catch (e) {
      console.log(e)
    }
  },
  [types.SET_APP_LOADING]: async ({ commit }, payload) => {
    commit(types.SET_LOADING, payload)
  },
}
