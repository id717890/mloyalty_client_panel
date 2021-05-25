import appTypes from '~/store/app/types'
import Constants from '~/helpers/constants'

export default async ({ store, redirect }) => {
  const metadata = window?.xprops?.metadata
  const code = window?.xprops?.code
  const hostname = window?.xprops?.hostname ?? 'htt://localhost'
  const currentCode = store?.state?.app?.sitecode
  console.log('INIT', code, currentCode, hostname, metadata)
  if (metadata) store?.commit(`app/${appTypes.SET_METADATA}`, metadata)
  if (hostname) store?.commit(`app/${appTypes.SET_SOURCEURL}`, hostname)
  if (code && currentCode?.toUpperCase() !== code?.toUpperCase()) {
    store?.commit(`app/${appTypes.SET_SITECODE}`, code)
  }
  if (code?.toUpperCase() === Constants?.SITECODES?.EMPTY?.toUpperCase()) {
    redirect({ name: 'code-empty' })
  } else if (
    code?.toUpperCase() === Constants?.SITECODES?.DEFAULT?.toUpperCase()
  ) {
    redirect({ name: 'code-default' })
  }
}
