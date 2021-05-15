import AuthService from '@/api/AuthService'
import appTypes from '~/store/app/types'

export default async ({ store, redirect }) => {
  console.log('jwtauth')
  const metadata = window?.xprops?.metadata
  const code = window?.xprops?.code
  const sourceurl = window?.xprops?.sourceurl
  if (metadata) store?.commit(`app/${appTypes.SET_METADATA}`, metadata)
  if (code) store?.commit(`app/${appTypes.SET_SITECODE}`, code)
  if (sourceurl) store?.commit(`app/${appTypes.SET_SOURCEURL}`, sourceurl)
  console.log('INIT', code, sourceurl, metadata)
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
