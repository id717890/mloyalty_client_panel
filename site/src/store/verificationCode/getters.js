export default {
  isVerified: state => {
    return (
      state.contacts.email !== null &&
      state.contacts.phone !== null &&
      state.contacts.sendingMethod !== null
    )
  }
}
