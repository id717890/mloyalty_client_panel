import ApiBase from './_ApiBase'

export default {
  clientCreate(data) {
    return ApiBase.post('api/client/ClientCreate', data)
  },
  getClientInfo(data) {
    return ApiBase.post('api/Client/ClientInfo', data)
  },
  getCard(data) {
    return ApiBase.post('api/Card/GetCard', data)
  },
  getCheques(data) {
    return ApiBase.post('api/values/GetCheques', data)
  },
  getBonuses(data) {
    return ApiBase.post('api/client/BonusesNotForPurchases', data)
  },
}
