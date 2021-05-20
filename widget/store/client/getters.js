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
    const bonuses = state?.clientBonuses?.CardBonuses
    if (bonuses) {
      // console.log('map bonus')
      resultBonuses = bonuses.map((bonus) => {
        const date = format(parseISO(bonus?.BonusTime), 'dd.MM.yyyy')
        const time = format(parseISO(bonus?.BonusTime), 'hh:mm')
        const dateTime = bonus?.BonusTime

        const bonusMapped = {
          id: uuid(),
          date,
          time,
          dateTime,
          title: bonus?.BonusType,
          bonus:
            bonus?.Bonus?.toString().indexOf('-') !== -1
              ? bonus?.Bonus
              : `+${bonus?.Bonus}`,
          color:
            bonus?.Bonus?.toString().indexOf('-') !== -1
              ? 'ml-text-red1'
              : 'ml-text-green1',
          type: Constants?.OPERATION_TYPE?.BONUS?.name,
        }
        return bonusMapped
      })
    }
    if (orders) {
      resultOrders = orders.map((order) => {
        const date = format(parseISO(order?.Date), 'dd.MM.yyyy')
        const time = format(parseISO(order?.Date), 'hh:mm')
        const dateTime = order?.Date
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
          color: 'ml-text-green1',
        }
        const bonus = order?.Bonus
        const bonusUse = order?.PaidByBonus
        if (bonus) orderMapped.bonus = `+${bonus}`
        if (bonusUse) orderMapped.bonusUse = `-${bonusUse}`
        return orderMapped
      })
    }
    // console.log(resultOrders)
    // console.log(resultBonuses)
    return [...resultOrders, ...resultBonuses].sort((a, b) => {
      // return [...resultOrders].sort((a, b) => {
      // return [...resultBonuses].sort((a, b) => {
      if (parseISO(a?.dateTime) < parseISO(b?.dateTime)) return 1
      if (parseISO(a?.dateTime) > parseISO(b?.dateTime)) return -1
      return 0
    })
  },
}
