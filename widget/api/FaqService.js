import ApiBase from './_ApiBase'

export default {
  getSiteFaq(data) {
    return ApiBase.post('api/sertcard/SiteFaq', data)
  },
}
