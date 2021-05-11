import AuthService from '@/api/AuthService'
// import ConfigService from '@/api/ConfigService'
// import store from '@/store'
// import appTypes from '@/store/app/types'

// const getSiteConfig = async () => {
//   const operator = store?.state?.auth?.decodeJwt?.oper
//   const decodeToken = store?.state?.auth?.decodeJwt?.token
//   const siteCode = store?.getters['app/getSiteCode']
//   if (!operator || !decodeToken || !siteCode) {
//     next('/access-denied')
//   }
//   const data = {
//     Operator: operator,
//     Token: decodeToken,
//     SiteCode: siteCode
//   }
//   return ConfigService.getSiteConfig(data).then(response => {
//     if (response.status === 200) {
//       const { data } = response
//       delete data.ErrorCode
//       delete data.Message
//       store.commit(`app/${appTypes.SET_SITECONFIG}`, data)
//       console.log('api getSiteConfig')
//     }
//   })
// }
export default async ({ store, redirect }) => {
  console.log('jwtauth')
  const accessToken = store?.state?.auth?.accessToken
  const refreshToken = store?.state?.auth?.refreshToken
  // Определяем наличие accessToken и refreshToken в хранилище
  // если их нет вызываем метод авторизации (либо из Local Storage, либо через АПИ)
  if (!accessToken || !refreshToken) {
    try {
      // await AuthService.authManager(store)
      await AuthService.authManagerForce()
    } catch (e) {
      console.log('ERROR', e)
      redirect({ name: 'errors-400', params: { message: e } })
      // return next({ name: 'Error', params: { message: e } })
    }
  }
}

// export default async (to, from, next) => {
//   const noGuard = to?.meta?.noGuard
//   if (noGuard) return next()
//   const accessToken = store?.state?.auth?.accessToken
//   const refreshToken = store?.state?.auth?.refreshToken
//   // Определяем наличие accessToken и refreshToken в хранилище
//   // если их нет вызываем метод авторизации (либо из Local Storage, либо через АПИ)
//   if (!accessToken || !refreshToken) {
//     try {
//       await AuthService.authManager()
//     } catch (e) {
//       return next({ name: 'Error', params: { message: e } })
//     }
//   }

//   // // Определяем сколько настроек в объекте config, если 1 поле, то считает конфиг не инициализированным и запрашиваем его с сервера
//   // const configFieldsCount = Object.keys(store.state.app.config).length
//   // if (configFieldsCount <= 1) {
//   //   await getSiteConfig()
//   // }

//   return next()
// }
