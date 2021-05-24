import clientTypes from '~/store/client/types'

export default async ({ store, redirect }) => {
  try {
    if (!store?.getters['client/isClientData']) {
      console.log('BEFORE LOGIN_LK')
      const result = await store.dispatch(`client/${clientTypes.LOGIN_LK}`)
      console.log('AFTER LOGIN_LK', result)
      if (result !== true) redirect({ name: 'registration' })
    }
  } catch (e) {
    redirect({ name: 'errors-400', params: { message: e } })
  }
}
