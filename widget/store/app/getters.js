export default {
  getClientMloyalty: (state) => {
    return state?.metadata?.client_mloyalty
  },
  getClientIshop: (state) => {
    return state?.metadata?.client_ishop
  },
  getPosCode: (state) => {
    // return 'MilanaSilv'
    return state?.mainWidgetConfig?.RequestData?.PosCode
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
