import ApiBase from './_ApiBase'

export default {
  createRequestToSupport(data) {
    return ApiBase.post('api/lead/LeadCreate', data)
  },
}
