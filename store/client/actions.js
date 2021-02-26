import types from './types'
import ClientService from '~/api/ClientService'

export default {
  [types.LOGIN_LK]: async ({ state, dispatch }) => {
    try {
      dispatch('app/SET_APP_LOADING', true, { root: true })
      if (!state.clientInfo) await dispatch(types.GET_CLIENT_INFO)
      if (!state.clientCard) await dispatch(types.GET_CLIENT_CARD)
      if (!state.clientCheques) await dispatch(types.GET_CLIENT_CHEQUES)
      setTimeout(() => {
        dispatch('app/SET_APP_LOADING', false, { root: true })
      }, 1000)
      return Promise.resolve(true)
    } catch (e) {
      console.log('ERRORS', e)
    }
  },
  [types.GET_CLIENT_CHEQUES]: async ({ state, commit }) => {
    const client = state?.clientInfo?.Id
    if (!client) throw new Error('GET_CLIENT_CHEQUES: clientID is not defined')
    const operator = state?.operator
    if (!operator)
      throw new Error('GET_CLIENT_CHEQUES: operatorID is not defined')

    const data = {
      DateStart: '2017-01-01',
      Client: client,
      Operator: operator,
      Page: 0,
      PageSize: 100,
    }

    return ClientService.getCheques(data).then((response) => {
      if (
        response?.status === 200 &&
        !response?.data?.ErrorCode &&
        !response?.data?.Message
      ) {
        delete response?.data?.Message
        delete response?.data?.ErrorCode
        commit(types.SET_CLIENT_CHEQUES, response?.data)
        return response?.data
      } else {
        throw new Error('GET_CLIENT_CARD', response)
      }
    })
  },
  [types.GET_CLIENT_CARD]: async ({ state, commit }) => {
    const card = state?.clientInfo?.Card
    if (!card) throw new Error('GET_CLIENT_CARD: card is not defined')
    return ClientService.getCard({ card }).then((response) => {
      if (
        response?.status === 200 &&
        !response?.data?.ErrorCode &&
        !response?.data?.Message
      ) {
        delete response?.data?.Message
        delete response?.data?.ErrorCode
        commit(types.SET_CLIENT_CARD, response?.data)
        return response?.data
      } else {
        throw new Error('GET_CLIENT_CARD', response)
      }
    })
  },
  [types.GET_CLIENT_INFO]: async ({ state, rootState, commit }) => {
    const operator = state?.operator
    const phone = rootState?.verify?.phone
    return ClientService.getClientInfo({ operator, phone }).then((response) => {
      if (
        response?.status === 200 &&
        !response?.data?.ErrorCode &&
        !response?.data?.Message
      ) {
        delete response?.data?.Message
        delete response?.data?.ErrorCode
        commit(types.SET_CLIENT_INFO, response?.data)
        return response?.data
      } else {
        throw new Error('CLIENT_INFO', response)
      }
    })
  },
}
