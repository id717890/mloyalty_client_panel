import { format, parseISO } from 'date-fns'
import { v4 as uuid } from 'uuid'
import Constants from '~/helpers/constants'

export default {
  isClientData: (state) => {
    return (
      state.clientInfo !== null &&
      state.clientBonuses !== null &&
      state.clientCheques !== null
    )
  },
  allOrdersAndBonuses: (state) => {
    let resultOrders = []
    let resultBonuses = []
    const orders = state?.clientCheques?.ChequeData
    const bonuses = state?.clientBonuses?.Bonuses
    if (bonuses) {
      resultBonuses = bonuses.map((bonus) => {
        const date = format(parseISO(bonus?.BonusDate), 'dd.MM.yyyy')
        const time = format(parseISO(bonus?.BonusDate), 'hh:mm')
        const dateTime = format(
          parseISO(bonus?.BonusDate),
          'dd.MM.yyyy hh:mm:ss'
        )

        const bonusMapped = {
          id: uuid(),
          date,
          time,
          dateTime,
          title: bonus?.BonusSource,
          bonus: `+${bonus?.BonusAdded}`,
          type: Constants?.OPERATION_TYPE?.BONUS?.name,
        }
        return bonusMapped
      })
    }
    if (orders) {
      resultOrders = orders.map((order) => {
        const date = format(parseISO(order?.Date), 'dd.MM.yyyy')
        const time = format(parseISO(order?.Date), 'hh:mm')
        const dateTime = format(parseISO(order?.Date), 'dd.MM.yyyy hh:mm:ss')
        let type
        let sum
        const operationType = order?.OperationType?.toLowerCase()
        switch (operationType) {
          case Constants?.OPERATION_TYPE?.BUY?.cyrillic?.toLowerCase():
            type = Constants?.OPERATION_TYPE?.BUY?.name
            sum = order?.Summ
            break
          case Constants?.OPERATION_TYPE?.REFUND?.cyrillic?.toLowerCase():
            type = Constants?.OPERATION_TYPE?.REFUND?.name
            sum = `-${order?.Summ}`
            break
        }
        const orderMapped = {
          id: order?.Id,
          title: order?.Partner,
          date,
          time,
          dateTime,
          shopName: order?.PosName,
          type,
          sum,
          items: order?.Items,
        }
        const bonus = order?.Bonus
        const bonusUse = order?.PaidByBonus
        if (bonus) orderMapped.bonus = `+${bonus}`
        if (bonusUse) orderMapped.bonusUse = `-${bonusUse}`
        return orderMapped
      })
    }
    return [...resultOrders, ...resultBonuses].sort((a, b) => {
      if (a?.dateTime > b?.dateTime) return 1
      if (a?.dateTime < b?.dateTime) return -1
      return 0
    })
  },
}
