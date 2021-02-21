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
}
