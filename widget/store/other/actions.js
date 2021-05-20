import types from './types'
import otherService from '~/api/OtherService'

export default {
  [types.GET_PROMO_ACTION]: async ({ rootGetters, rootState, commit }) => {
    const operator = rootGetters['app/getOperator']
    const token = rootGetters['app/getToken']
    const client = rootState?.client?.clientInfo?.Id
    const request = { operator, token, client }
    const { data, status } = await otherService.getPromo(request)
    if (status === 200 && data?.ErrorCode === 0 && !data?.Message) {
      commit(types.SET_PROMO, data?.CampaignData)
    }
  },
}
