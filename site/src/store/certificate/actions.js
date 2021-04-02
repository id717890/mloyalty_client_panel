import types from './types'

const testOptions = {
  certificates: [
    {
      id: 1,
      img: '@/assets/img/example/design1.png',
      price: 3000
    },
    {
      id: 2,
      img: '@/assets/img/example/design2.png',
      price: 1000
    }
  ],
  pars: [500, 1000, 3000, 5000, 10000]
}

export default {
  [types.GET_CERTIFICATE_OPTIONS]({ commit }) {
    commit('app/SET_LOADING_APP', true, { root: true })
    setTimeout(() => {
      commit(types.SET_CERTIFICATE_OPTIONS, testOptions)
      commit('app/SET_LOADING_APP', false, { root: true })
    }, 1000)
  }
}
