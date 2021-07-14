import types from './types'

export default {
  [types.SET_SETTINGS_NOTIFY]: (state, payload) => {
    state.notify = payload
  },
  [types.SET_SETTINGS_EMAIL_IS_VERIFY]: (state, payload) => {
    state.emailIsVerify = payload
  },
  [types.SET_SETTINGS_PHONE_IS_VERIFY]: (state, payload) => {
    state.phoneIsVerify = payload
  },
  [types.SET_SETTINGS_FIO]: (state, payload) => {
    state.fio = payload
  },
  [types.SET_SETTINGS_PHONE]: (state, payload) => {
    state.phone = payload
  },
  [types.SET_SETTINGS_EMAIL]: (state, payload) => {
    state.email = payload
  },
  [types.SET_SETTINGS_BIRTHDATE]: (state, payload) => {
    state.birthdate = payload
  },
  [types.SET_SETTINGS_GENDER]: (state, payload) => {
    state.gender = payload
  },
  [types.SET_SETTINGS_IS_SAVED]: (state, payload) => {
    state.isSaved = payload
  },
}
