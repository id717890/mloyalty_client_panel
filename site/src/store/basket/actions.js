import types from './types'

const testBasket = [
  {
    certification: {
      text:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla unde architecto quod nostrum minus numquam sint blanditiis distinctio. Voluptates facere eaque beatae vero eum, neque dolor odit facilis. Aperiam, eligendi?'
    },
    count: 2,
    price: 3000
  }
]

export default {
  [types.UPDATE_CERTIFICATE_ACTION]({ commit, state, getters }, certificate) {
    console.log(state.basket.filter(x => x.certificate.id !== certificate))
  },
  // [types.ADD_CERTIFICATE_TO_BASKET]({ commit }, payload) {
  //   commit(types.ADD_CERTIFICATE, payload)
  // },
  [types.INIT_EMPTY_BASKET]({ commit }) {
    commit(types.SET_BASKET, null)
  },
  [types.INIT_TEST_BASKET]({ commit }) {
    commit(types.SET_BASKET, testBasket)
  }
}
