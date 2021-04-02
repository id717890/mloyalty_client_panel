export default {
  ADD_FAKE_ORDERS: (state) => {
    state.orders = orders
  },
}

const orders = [
  {
    id: 1,
    date: '13.09.2019',
    time: '09:34',
    title: 'FORWARD',
    shopName: 'Магазин на Пятницком',
    type: 'refund',
    bonus: '+445',
    bonusUse: '-1875',
    sum: '-113 398',
  },
  {
    id: 2,
    date: '22.09.2019',
    time: '09:34',
    title: 'WELCOME BONUS',
    type: 'bonus',
    bonus: '+445',
  },
  {
    id: 3,
    date: '13.09.2019',
    time: '11:11',
    title: 'FORWARD',
    shopName: 'Магазин на Пятницком',
    type: 'buy',
    bonus: '445',
    bonusUse: '-1875',
    sum: '113 398',
  },
  {
    id: 4,
    date: '10.10.2020',
    time: '12:34',
    title: 'WELCOME BONUS',
    type: 'bonus',
    bonus: '+690',
  },
  {
    id: 5,
    date: '21.02.2021',
    time: '11:30',
    title: 'FORWARD',
    shopName: 'Магазин на Пятницком',
    type: 'buy',
    bonus: '250',
    bonusUse: '-1500',
    sum: '99 000',
  },
]
