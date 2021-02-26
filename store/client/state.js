import config from '~/static/config'

export default {
  operator: config?.operator || 42,
  clientInfo: null,
  clientCard: null,
  clientCheques: null,
}
