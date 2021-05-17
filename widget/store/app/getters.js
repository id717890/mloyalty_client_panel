export default {
  getClientMloyalty: (state, getters, rootState) => {
    return rootState?.client?.clientId ?? state?.metadata?.client_mloyalty
  },
  getClientIshop: (state) => {
    return state?.metadata?.client_ishop
  },
  getPosCode: (state) => {
    // return 'MilanaSilv'
    return state?.mainWidgetConfig?.RequestData?.PosCode
  },
  getToken: (state) => {
    return state?.mainWidgetConfig?.RequestData?.Token
  },
  getPartner: (state) => {
    // return 39
    return state?.mainWidgetConfig?.RequestData?.Partner
  },
  getOperator: (state) => {
    // return 10
    return state?.mainWidgetConfig?.RequestData?.Operator
  },
}
