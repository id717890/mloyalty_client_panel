import jwtDecode from 'jwt-decode'
import types from './types'

export default {
  [types.SET_ACCESS_TOKEN](state, accessToken) {
    // console.log('SET ACCESS TOKEN')
    state.accessToken = accessToken
    if (accessToken) {
      state.decodeJwt = jwtDecode(accessToken)
    }
  },
  [types.SET_REFRESH_TOKEN](state, refreshToken) {
    // console.log('SET REFRESH TOKEN')
    state.refreshToken = refreshToken
  },
}
