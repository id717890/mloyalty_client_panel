import types from './types'
import ClientService from '~/api/ClientService'
import verifyTypes from '~/store/verify/types'

const PAGE_SIZE = 1000

export default {
  [types.CLIENT_CHANGE_FIO_ACTION]: async (
    { rootGetters, state, commit },
    fio
  ) => {
    const operator = rootGetters['app/getOperator']
    const token = rootGetters['app/getToken']
    const poscode = rootGetters['app/getPosCode']
    const clientData = {
      id: state?.clientInfo?.Id,
      firstname: fio,
    }
    const requset = {
      operator,
      token,
      poscode,
      clientData,
    }
    const { data, status } = await ClientService.changeFio(requset)
    if (status === 200 && data?.ErrorCode === 0 && !data?.Message) {
      commit(types.CHANGE_CLIENT_NAME, fio)
    }
  },
  [types.CLIENT_CREATE_ISHOP_ACTION]: async ({ rootGetters, rootState }) => {
    // const operator = rootState?.auth?.decodeJwt?.oper
    const { sourceurl } = rootState?.app
    const operator = rootGetters['app/getOperator']
    const token = rootState?.auth?.decodeJwt?.token
    const clientId = rootGetters['app/getClientMloyalty']
    // state?.clientId
    const clientIshop = parseInt(rootGetters['app/getClientIshop'])
    const request = { operator, token, clientId, clientIshop, sourceurl }
    if (clientIshop && clientId) {
      // const { data, status } = await ClientService.clientCreateIshop(request)
      // console.log(data, status)
      await ClientService.clientCreateIshop(request)
      console.log('success api')
    }
  },
  [types.LOGIN_LK]: async ({ state, dispatch }) => {
    try {
      dispatch('app/SET_APP_LOADING', true, { root: true })
      console.log('clientInfo')
      if (!state.clientInfo) await dispatch(types.GET_CLIENT_INFO)
      // console.log('clientCard')
      // if (!state.clientCard) await dispatch(types.GET_CLIENT_CARD)
      console.log('clientCheques')
      if (!state.clientCheques) await dispatch(types.GET_CLIENT_CHEQUES)
      console.log('clientBonuses')
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
  [types.GET_CLIENT_BONUSES]: async ({ state, rootGetters, commit }) => {
    // const client = state?.clientInfo?.Id
    // if (!client) throw new Error('GET_CLIENT_BONUSES: clientID is not defined')
    // const operator = state?.operator
    // const { oper: operator } = rootState?.auth?.decodeJwt
    const operator = rootGetters['app/getOperator']
    const token = rootGetters['app/getToken']
    if (!operator)
      throw new Error('GET_CLIENT_BONUSES: operatorID is not defined')
    if (!token) throw new Error('GET_CLIENT_BONUSES: token is not defined')
    const card = state?.clientInfo?.Card
    if (!card) throw new Error('GET_CLIENT_BONUSES: card is not defined')

    const data = {
      DateStart: '2017-01-01',
      // Client: client,
      Card: card,
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
        console.log('SUCCESS BONUS')
        return response?.data
      } else {
        throw new Error('GET_CLIENT_BONUSES', response)
      }
    })
  },
  [types.GET_CLIENT_CHEQUES]: async ({ state, rootGetters, commit }) => {
    const client = state?.clientInfo?.Id
    if (!client) throw new Error('GET_CLIENT_CHEQUES: clientID is not defined')
    // const operator = state?.operator
    // const { oper: operator } = rootState?.auth?.decodeJwt
    const operator = rootGetters['app/getOperator']
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
  // TODO удалить и почистить этот метод и связанные
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
  [types.CLIENT_CREATE_ACTION_2]: async ({ rootGetters, commit }, phone) => {
    const operator = rootGetters['app/getOperator']
    const partner = rootGetters['app/getPartner']
    const poscode = rootGetters['app/getPosCode']
    const allowSms = 1
    const allowEmail = 1
    const allowPush = 1
    const agreePersonalData = 1
    const request = {
      operator,
      partner,
      poscode,
      phone,
      allowSms,
      allowEmail,
      allowPush,
      agreePersonalData,
    }
    console.log('await CLIENT_CREATE_ACTION_2')
    const { data, status } = await ClientService.clientCreate(request)
    if (status === 200 && !data?.Message && data?.ErrorCode === 0) {
      console.log('CLIENT ID', data?.Client)
      commit(types.SET_CLIENT_ID, data?.Client)
    }
    console.log(data, status)
    console.log('finish CLIENT_CREATE_ACTION_2')
    // if (
    //   createClientResponse?.status === 200 &&
    //   createClientResponse?.data?.ErrorCode === 0 &&
    //   !createClientResponse?.data?.Message
    // ) {
    //   return ClientService.getClientInfo({ operator, phone }).then(
    //     async (response) => {
    //       if (
    //         response?.status === 200 &&
    //         !response?.data?.ErrorCode &&
    //         !response?.data?.Message
    //       ) {
    //         delete response?.data?.Message
    //         delete response?.data?.ErrorCode
    //         commit(types.SET_CLIENT_INFO, response?.data)
    //         return response?.data
    //       } else {
    //         // eslint-disable-next-line no-undef
    //         // $nuxt._router.push({ name: 'errors-400' })
    //         throw new Error(
    //           'CLIENT_CREATE_ACTION, after create' + response?.data?.Message
    //         )
    //       }
    //     }
    //   )
    // } else {
    //   throw new Error(
    //     'CLIENT_CREATE_ACTION:' + createClientResponse?.data?.Message
    //   )
    // }
  },
  [types.CLIENT_CREATE_ACTION]: async ({ rootState, commit }, { phone }) => {
    const { oper: operator, partner, poscode } = rootState?.auth?.decodeJwt
    const data = {
      operator,
      partner,
      poscode,
      phone,
      // card: Date.now(),
      allowSms: 1,
      allowEmail: 1,
      allowPush: 1,
      gender: 0,
      agreePersonalData: 1,
    }
    const createClientResponse = await ClientService.clientCreate(data)
    if (
      createClientResponse?.status === 200 &&
      createClientResponse?.data?.ErrorCode === 0 &&
      !createClientResponse?.data?.Message
    ) {
      return ClientService.getClientInfo({ operator, phone }).then(
        async (response) => {
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
            throw new Error(
              'CLIENT_CREATE_ACTION, after create' + response?.data?.Message
            )
          }
        }
      )
    } else {
      throw new Error(
        'CLIENT_CREATE_ACTION:' + createClientResponse?.data?.Message
      )
    }
  },
  [types.GET_CLIENT_INFO]: async ({
    dispatch,
    commit,
    rootGetters,
    rootState,
  }) => {
    const operator = rootGetters['app/getOperator']
    const phone = rootState?.verify?.phone
    const client = rootGetters['app/getClientMloyalty']
    return ClientService.getClientInfo({ operator, client }).then(
      async (response) => {
        if (response?.status === 200) {
          if (!response?.data?.ErrorCode && !response?.data?.Message) {
            delete response?.data?.Message
            delete response?.data?.ErrorCode
            commit(types.SET_CLIENT_INFO, response?.data)
            commit(`verify/${verifyTypes.SET_PHONE}`, response?.data?.Phone, {
              root: true,
            })
            return response?.data
          } else if (
            response?.data?.ErrorCode === 4 &&
            response?.data?.Message === 'Номер телефона не найден'
          ) {
            // TODO ????
            await dispatch(types.CLIENT_CREATE_ACTION, { phone })
          }
        } else {
          // eslint-disable-next-line no-undef
          // $nuxt._router.push({ name: 'errors-400' })
          throw new Error(response?.data?.Message)
        }
      }
    )
  },
}
