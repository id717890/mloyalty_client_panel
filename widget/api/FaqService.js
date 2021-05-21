import ApiBase from './_ApiBase'

export default {
  getSiteFaq(data) {
    return ApiBase.post('api/site/getfaq', data)
  },
}
