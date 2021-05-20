import ApiBase from './_ApiBase'

export default {
  getPromo(data) {
    return ApiBase.post('api/site/GetCampaigns', data)
  },
}
