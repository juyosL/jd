import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import cart from './modules/cart'
import hresult from './modules/hresult'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    user,
    cart,
    hresult
  }
})
