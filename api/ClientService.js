import ApiBase from './_ApiBase'

export default {
  getClientInfo(data) {
    return ApiBase.post('api/Client/ClientInfo', data)
  },
  getCard(data) {
    return ApiBase.post('api/Card/GetCard', data)
  },
  getCheques(data) {
    return ApiBase.post('api/values/GetCheques', data)
  },
}
