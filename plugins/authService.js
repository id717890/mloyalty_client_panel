import Vue from 'vue'
import authTypes from '@/store/auth/types'
import ApiBase from '@/api/_ApiBase'

// const service = {
//   getAccessToken: () => {
//     const token = localStorage.getItem('access_token')
//     if (!token) {
//       return null
//     }
//     return token
//   },
//   getRefreshToken: () => {
//     const token = localStorage.getItem('refresh_token')
//     if (!token) {
//       return null
//     }
//     return token
//   },
//   setAccessToken: (token) => {
//     localStorage.setItem('access_token', token)
//   },
//   setRefreshToken: (token) => {
//     localStorage.setItem('refresh_token', token)
//   },
//   logout: () => {
//     localStorage.removeItem('access_token')
//     localStorage.removeItem('refresh_token')
//   },
// }

export default ({ app, store }, inject) => {
  inject('mlauth', {
    authManager: (app) => {
      console.log(app)
      const localAccessToken = this.getAccessToken()
      const localRefreshToken = this.getRefreshToken()
      if (localAccessToken && localRefreshToken) {
        console.log('AUTH LS')
        // eslint-disable-next-line no-undef
        store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, localAccessToken)
        // eslint-disable-next-line no-undef
        store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, localRefreshToken)
        return Promise.resolve()
      } else {
        const data = new URLSearchParams()
        data.append('username', 'unksite')
        data.append('password', 'unksite')
        data.append('grant_type', 'password')
        return ApiBase.post('managerLogin', data).then((response) => {
          if (response.status === 200) {
            console.log('AUTH API')
            const accessToken = response?.data?.access_token
            const refreshToken = response?.data?.refresh_token
            if (accessToken && refreshToken) {
              // eslint-disable-next-line no-undef
              store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, refreshToken)
              // eslint-disable-next-line no-undef
              store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, accessToken)
              Vue.auth.setAccessToken(accessToken)
              Vue.auth.setRefreshToken(refreshToken)
            }
          }
        })
      }
    },
  })
}
