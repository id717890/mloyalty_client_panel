import types from './types'
import FaqService from '~/api/FaqService'
import errorHandler from '~/helpers/errorHandler'

export default {
  [types.GET_FAQS]: async ({ commit, rootGetters, rootState }) => {
    const sitecode = rootState?.app?.sitecode
    const operator = rootGetters['app/getOperator']
    const token = rootGetters['app/getToken']
    // const isWidgetBurger = payload?.isWidgetBurger
    // const isWidgetPreview = payload?.isWidgetPreview
    // const isSertOwnerSite = payload?.isSertOwnerSite
    if (!operator || !sitecode || !token) {
      return errorHandler.throw('GET_FAQS: не определен один из параметров')
    }
    const request = {
      sitecode,
      operator,
      token,
      site: true,
      // VidgetBurger: isWidgetBurger,
      // VidgetPreview: isWidgetPreview,
      // SertOwnerSite: isSertOwnerSite,
    }
    const response = await FaqService.getSiteFaq(request)
    if (
      response?.status === 200 &&
      !response?.data?.Message &&
      !response?.data?.ErrorCode
    ) {
      commit(types.SET_FAQS, response?.data?.FaqData)
      return Promise.resolve()
    }
    return Promise.reject(new Error('action GET_FAQS error'))
  },
}
