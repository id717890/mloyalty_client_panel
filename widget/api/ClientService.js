import ApiBase from './_ApiBase'

export default {
  changeFio(data) {
    return ApiBase.post('api/client/ChangeClient', data)
  },
  clientCreateIshop(data) {
    return ApiBase.post('api/client/ClientCreateIshop', data)
  },
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
  // TODO удалить после завершения нового метода
  getBonusesOld(data) {
    return ApiBase.post('api/client/BonusesNotForPurchases', data)
  },
  getBonuses(data) {
    return ApiBase.post('api/client/CardBonuses', data)
  },
}
