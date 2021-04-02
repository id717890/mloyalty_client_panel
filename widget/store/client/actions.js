import types from './types'
import ClientService from '~/api/ClientService'

const PAGE_SIZE = 1000

export default {
  [types.LOGIN_LK]: async ({ state, dispatch }) => {
    try {
      dispatch('app/SET_APP_LOADING', true, { root: true })
      if (!state.clientInfo) await dispatch(types.GET_CLIENT_INFO)
      if (!state.clientCard) await dispatch(types.GET_CLIENT_CARD)
      if (!state.clientCheques) await dispatch(types.GET_CLIENT_CHEQUES)
      if (!state.clientBonuses) await dispatch(types.GET_CLIENT_BONUSES)
      setTimeout(() => {
        dispatch('app/SET_APP_LOADING', false, { root: true })
      }, 1000)
      return Promise.resolve(true)
    } catch (e) {
      console.log('LOGIN_LK ERRORS', e)
      // eslint-disable-next-line no-undef
      $nuxt._router.push({ name: 'errors-400', params: { message: e } })
      return Promise.resolve(true)
    }
  },
  [types.GET_CLIENT_BONUSES]: async ({ state, commit }) => {
    const client = state?.clientInfo?.Id
    if (!client) throw new Error('GET_CLIENT_BONUSES: clientID is not defined')
    const operator = state?.operator
    if (!operator)
      throw new Error('GET_CLIENT_BONUSES: operatorID is not defined')
    const card = state?.clientInfo?.Card
    if (!card) throw new Error('GET_CLIENT_BONUSES: card is not defined')

    const data = {
      DateStart: '2017-01-01',
      Client: client,
      // Card: card,
      Operator: operator,
      Page: 0,
      PageSize: PAGE_SIZE,
    }

    return ClientService.getBonuses(data).then((response) => {
      if (
        response?.status === 200 &&
        !response?.data?.ErrorCode &&
        !response?.data?.Message
      ) {
        delete response?.data?.Message
        delete response?.data?.ErrorCode
        commit(types.SET_CLIENT_BONUSES, response?.data)
        return response?.data
      } else {
        throw new Error('GET_CLIENT_BONUSES', response)
      }
    })
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
      PageSize: PAGE_SIZE,
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
        // eslint-disable-next-line no-undef
        // $nuxt._router.push({ name: 'errors-400' })
        throw new Error(response?.data?.Message)
      }
    })
  },
}
