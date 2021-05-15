export default {
  throw(message = null, subMessage = null) {
    // eslint-disable-next-line no-undef
    $nuxt.$router.push({
      name: 'errors-400',
      params: { message },
    })
  },
}
