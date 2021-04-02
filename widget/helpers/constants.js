export default {
  SMS_CODE_TYPE: {
    SERT_BUYER: 1,
    BALANCE: 2,
  },
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
  OPERATION_TYPE: {
    BUY: {
      cyrillic: 'Покупка',
      name: 'buy',
    },
    REFUND: {
      cyrillic: 'Возврат',
      name: 'refund',
    },
    BONUS: {
      cyrillic: 'Бонус',
      name: 'bonus',
    },
  },
  // SEND_METHOD: {
  //   VERIFICATION_BY_SMS: 'VERIFICATION_BY_SMS',
  //   VERIFICATION_BY_MESSENGER: 'VERIFICATION_BY_MESSENGER',
  // },
  BURGER_PAGES: {
    INDEX: 'INDEX',
    PROFILE: 'PROFILE',
    DISCOUNT: 'DISCOUNT',
    ADDRESS: 'ADDRESS',
    RULES: 'RULES',
    SUPPORT: 'SUPPORT',
    FEEDBACK: 'FEEDBACK',
    FAQ: 'FAQ',
  },
}
