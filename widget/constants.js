export default {
  GENDERS: [
    { id: -1, name: 'Не указан' },
    { id: 1, name: 'Женский' },
    { id: 2, name: 'Мужской' },
  ],
  PAGE_CONFIG: {
    ORDER: 'Order',
  },
  DAY_OF_WEEK: [
    { short: 'Вс', name: 'Воскресенье' },
    { short: 'Пн', name: 'Понедельник' },
    { short: 'Вт', name: 'Вторник' },
    { short: 'Ср', name: 'Среда' },
    { short: 'Чт', name: 'Четверг' },
    { short: 'Пт', name: 'Пятница' },
    { short: 'Сб', name: 'Суббота' },
  ],
  TIME_TO_SEND: {
    NOW: 'NOW',
    MORNING: 'MORNING',
    LUNCH: 'LUNCH',
    EVENING: 'EVENING',
    ANY: 'ANY',
    MANUAL: 'MANUAL',
  },
  APP_CODES: {
    BUY: 'Купить',
    BALANCE: 'Баланс',
    BASKET: 'Готовая корзина',
    SUBSCRIPTION: 'Подписка',
    SUBSCRIPTION_DESIGN: 'ПодпискаДизайн',
  },
  SMS_CODE_TYPE: {
    SERT_BUYER: 1,
    BALANCE: 2,
  },
  PAYMENT_STATUS: {
    SUCCESS: 'успешно',
    NOT_SUCCESS: 'не успешно',
    IN_PROCCESS: 'в обработке',
  },
  DEFAULTS: {
    MAX_COUNT_PURCHASE: 10,
    ORDER: {
      STEP1_NAME: '1. Выберите дизайн',
      STEP2_NAME: '2. Номинал',
      STEP3_NAME: '3. Поздравление',
    },
  },
  CONFIG_BURGER: {
    NAME: 'Burger',
    WORK_PAGE: 'Burger_work',
    FAQ_PAGE: 'Burger_faq',
    OFFER_PAGE: 'Burger_offer',
    HELP_PAGE: 'Burger_help',
    RULE_PAGE: 'Burger_rules',
  },
  CONFIG_OWNER: {
    ANIMATION_PAGE: 'Animation',
    OWNER_PAGE: 'Sertowner',
  },
  CONFIG_PREVIEW_PAGE: 'Preview',
  SEND_METHOD: {
    SMS: {
      NAME: 'sms',
      COMMUNICATION_TYPE: 1,
    },
    TELEGRAM: {
      NAME: 'telegram',
      COMMUNICATION_TYPE: 6,
    },
    VIBER: {
      NAME: 'viber',
      COMMUNICATION_TYPE: 7,
    },
    WHATSAPP: {
      NAME: 'whatsapp',
      COMMUNICATION_TYPE: 9,
    },
  },
}
