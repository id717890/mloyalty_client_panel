import config from '~/static/config'

export default () => ({
  clientId: null,
  operator: config?.operator || 42,
  clientInfo: null,
  clientCard: null,
  clientCheques: null,
  clientBonuses: null,
})
