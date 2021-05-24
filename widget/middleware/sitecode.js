import appTypes from '~/store/app/types'
import Constants from '~/helpers/constants'

export default async ({ store, redirect }) => {
  const metadata = window?.xprops?.metadata
  const code = window?.xprops?.code
  const hostname = window?.xprops?.hostname ?? 'htt://localhost'
  if (metadata) store?.commit(`app/${appTypes.SET_METADATA}`, metadata)
  if (code) store?.commit(`app/${appTypes.SET_SITECODE}`, code)
  if (hostname) store?.commit(`app/${appTypes.SET_SOURCEURL}`, hostname)
  console.log('INIT', code, hostname, metadata)
  if (code?.toUpperCase() === Constants?.SITECODES?.EMPTY?.toUpperCase()) {
    redirect({ name: 'code-empty' })
  } else if (
    code?.toUpperCase() === Constants?.SITECODES?.DEFAULT?.toUpperCase()
  ) {
    redirect({ name: 'code-default' })
  }
}
