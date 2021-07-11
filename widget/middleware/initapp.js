export default async ({ store }) => {
  const clientMl = store.getters['app/getClientMloyalty']
  if (clientMl) {
    await store.dispatch('client/CLIENT_CREATE_ISHOP_ACTION')
  }
}
