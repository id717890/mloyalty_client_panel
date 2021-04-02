import ApiBase from './_ApiBase'

export default {
  /**
   * {
   * "sitecode": "{type:1}{oper:7}{part:12}{pcode:pobeda1}{tok:1234567891011}",// уникальный код виджета
   * "operator":3, //идентификатор оператора из jwt-токена
   * "token":1234567, //номер токена из jwt-токена
   * "name":"Александр",// имя покупателя сертификата, которому будет отправлен код сообщения
   * "email": "email@example.com", // почта покупателя сертификата, которому будет отправлен код сообщения
   * "phone": 9153992642, // номер телефона покупателя сертификата
   * "communicationtype": 1 // канал отправки кода сообщения
   * }
   * @param {Object} data
   */
  requestCode(data) {
    return ApiBase.post('api/sertcard/SendCode', data)
  },
  sendCode(data) {
    return ApiBase.post('api/sertcard/ConfirmCode', data)
  },
}
