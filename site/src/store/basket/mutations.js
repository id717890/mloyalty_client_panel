import types from './types'

export default {
  [types.REMOVE_CERTIFICATE](state) {
    const certificate = state.modalConfirmRemove.certificate
    if (certificate) {
      const find = state.basket.find(
        cert =>
          cert.certificate.id === certificate.certificate.id &&
          cert.price === certificate.price &&
          cert.congratulation === certificate.congratulation
      )
      if (find) {
        state.basket.splice(state.basket.indexOf(find), 1)
      }
    }
    state.modalConfirmRemove.show = false
    state.modalConfirmRemove.certificate = null
    state.currentCertificate = null
  },
  [types.CANCEL_REMOVE_CERTIFICATE](state) {
    let certificate = state.modalConfirmRemove.certificate
    certificate.count = 1
    // state.basket = [
    //   ...state.basket.filter(
    //     x => x.certificate.id !== certificate.certificate.id
    //   ),
    //   certificate
    // ]
    const find = state.basket.find(
      cert =>
        cert.certificate.id === certificate.certificate.id &&
        cert.price === certificate.price &&
        cert.congratulation === certificate.congratulation
    )
    if (find) {
      state.basket.splice(state.basket.indexOf(find), 1, certificate)
    }
    state.modalConfirmRemove.show = false
    state.modalConfirmRemove.certificate = null
  },
  [types.SET_BASKET](state, basket) {
    state.basket = basket
  },
  [types.ADD_CERTIFICATE](state, certificate) {
    if (!state.basket) {
      state.basket = [certificate]
    } else {
      const findTheSame = state.basket.find(
        cert =>
          cert.certificate.id === certificate.certificate.id &&
          cert.price === certificate.price &&
          cert.congratulation === certificate.congratulation
      )
      if (findTheSame) {
        certificate.count += findTheSame.count
        state.basket.splice(state.basket.indexOf(findTheSame), 1)
        state.basket.push(certificate)
      } else {
        state.basket.push(certificate)
      }
    }
  },
  [types.UPDATE_CERTIFICATE](state, certificate) {
    console.log(certificate)
    if (certificate.count === 0) {
      state.modalConfirmRemove.show = true
      state.modalConfirmRemove.certificate = certificate
    } else {
      const find = state.basket.find(
        cert =>
          cert.certificate.id === certificate.certificate.id &&
          cert.price === certificate.price &&
          cert.congratulation === certificate.congratulation
      )
      if (find) {
        state.basket.splice(state.basket.indexOf(find), 1, certificate)
      }
    }
  },
  [types.SET_CURRENT_CERTIFICATE](state, certificateIndex) {
    state.currentCertificate = certificateIndex
  }
}
