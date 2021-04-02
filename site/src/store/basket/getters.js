export default {
  currentCertificate: state => {
    const current = state.currentCertificate
    const basket = state.basket
    if (current !== null && basket) {
      return basket[current]
    }
    return null
  },
  basket: state => state.basket,
  /**
   * @returns {Object} { price: 0, count: 0 }
   */
  allPositions: state => {
    let certificates = state?.basket
    let result = {
      price: 0,
      count: 0
    }
    if (!certificates) return result
    certificates.forEach(cert => {
      const count = cert?.count
      const price = cert?.price
      if (price && count) {
        result.price += price * count
        result.count += count
      }
    })
    return result
  }
}
