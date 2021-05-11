import Vue from 'vue'
import authTypes from '@/store/auth/types'
import ApiBase from './_ApiBase'
// import store from '~/store'
import config from '~/config'
// import authLS from '~/plugins/authLS'

export default {
  getAccessToken() {
    const token = localStorage.getItem('access_token')
    if (!token) {
      return null
    }
    return token
  },
  getRefreshToken() {
    const token = localStorage.getItem('refresh_token')
    if (!token) {
      return null
    }
    return token
  },
  setAccessToken(token) {
    localStorage.setItem('access_token', token)
  },
  setRefreshToken(token) {
    localStorage.setItem('refresh_token', token)
  },
  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  },
  /**
   * Запускает принудительную авторизацию через АПИ, без проверки ключей в LS
   */
  authManagerForce() {
    const user = config?.jwtu
    const password = config?.jwtp
    if (!user || !password)
      throw new Error('AUTH_MANAGER_FORCED: JWT USER NOT DEFINED')
    const data = new URLSearchParams()
    data.append('username', user)
    data.append('password', password)
    data.append('grant_type', 'password')
    return ApiBase.post('managerLogin', data).then((response) => {
      if (response?.status === 200) {
        console.log('FORCE REAUTH API')
        const accessToken = response?.data?.access_token
        const refreshToken = response?.data?.refresh_token
        if (accessToken && refreshToken) {
          // eslint-disable-next-line no-undef
          // console.log($nuxt.$store)
          // eslint-disable-next-line no-undef
          $nuxt.$store.commit(
            `auth/${authTypes.SET_REFRESH_TOKEN}`,
            refreshToken
          )
          // eslint-disable-next-line no-undef
          $nuxt.$store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, accessToken)
          this.setAccessToken(accessToken)
          this.setRefreshToken(refreshToken)
        }
      }
    })
  },
  authManager(store) {
    if (!store) throw new Error('AuthService.authManager: store is not defined')
    const localAccessToken = this.getAccessToken()
    const localRefreshToken = this.getRefreshToken()
    if (localAccessToken && localRefreshToken) {
      console.log('AUTH LS')
      store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, localAccessToken)
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
            store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, refreshToken)
            store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, accessToken)
            this.setAccessToken(accessToken)
            this.setRefreshToken(refreshToken)
          }
        }
      })
    }
  },
  refreshToken() {
    const refreshToken =
      // store?.state?.auth?.refreshToken ?? Vue.auth.getRefreshToken()
      Vue.auth.getRefreshToken()
    console.log('refreshToken', 1)
    if (refreshToken) {
      console.log('refreshToken', 2)
      const data = new URLSearchParams()
      data.append('grant_type', 'refresh_token')
      data.append('refresh_token', refreshToken)
      return ApiBase.post('managerLogin', data)
        .then((response) => {
          if (response?.status === 200) {
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
          } else {
            // eslint-disable-next-line no-undef
            store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, null)
            // eslint-disable-next-line no-undef
            store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, null)
            Vue.auth.logout()
          }
          return response
        })
        .catch((error) => {
          console.log('refreshToken', 3)
          // eslint-disable-next-line no-undef
          store.commit(`auth/${authTypes.SET_REFRESH_TOKEN}`, null)
          // eslint-disable-next-line no-undef
          store.commit(`auth/${authTypes.SET_ACCESS_TOKEN}`, null)
          Vue.auth.logout()
          return error
        })
    } else {
      throw new Error('ACCESS_TOKEN NOT DEFINED')
    }
  },
  // logout() {
  //   // eslint-disable-next-line no-undef
  //   store.commit(`auth/${authTypes.SET_USER}`, null)
  // },
  test() {
    const data = new URLSearchParams()
    data.append('Operator', 3)
    const config = {
      headers: {
        Authorization: 'Bearer null',
      },
    }
    return ApiBase.post('api/site/GetCampaigns', data, config).then((x) => {
      console.log(x)
    })
  },
}
