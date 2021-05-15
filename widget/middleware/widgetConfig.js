import appTypes from '~/store/app/types'

export default async ({ store, redirect }) => {
  const mainWidgetConfig = store?.app?.mainWidgetConfig
  if (!mainWidgetConfig) {
    await store?.dispatch(`app/${appTypes.GET_WIDGET_MAIN_CONFIG_ACTION}`)
  }
}
