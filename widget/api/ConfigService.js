import ApiBase from './_ApiBase'

export default {
  getMainWidgetConfig(data) {
    return ApiBase.post('api/site/LoyaltyVidgetConfig', data)
  },
}
