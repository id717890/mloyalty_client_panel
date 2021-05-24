import appTypes from '~/store/app/types'

export default async ({ store }) => {
  const mainWidgetConfig = store?.state?.app?.mainWidgetConfig
  const sitecode = store?.state?.app?.sitecode
  if (
    !mainWidgetConfig &&
    sitecode !== null &&
    sitecode !== '' &&
    sitecode !== '*'
  ) {
    await store?.dispatch(`app/${appTypes.GET_WIDGET_MAIN_CONFIG_ACTION}`)
  }
}
