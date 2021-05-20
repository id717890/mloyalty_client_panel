import types from './types'

export default {
  [types.SET_FAQS]: (state, payload) => {
    state.faqs = payload.map((item) => {
      return {
        question: item?.Question,
        answer: item?.Answer,
      }
    })
  },
}
