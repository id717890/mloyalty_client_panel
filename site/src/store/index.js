import app from './app/store'
import panel from './panel/store'
import panelBurger from './panelBurger/store'
import verificationCode from './verificationCode/store'
import basket from './basket/store'
import certificate from './certificate/store'
import loading from './loading/store'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    panel,
    panelBurger,
    verificationCode,
    basket,
    certificate,
    loading
  }
})
