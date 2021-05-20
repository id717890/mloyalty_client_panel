import appTypes from '~/store/app/types'

export default async ({ store, redirect }) => {
  const mainWidgetConfig = store?.state?.app?.mainWidgetConfig
  if (!mainWidgetConfig) {
    await store?.dispatch(`app/${appTypes.GET_WIDGET_MAIN_CONFIG_ACTION}`)
  }
}
