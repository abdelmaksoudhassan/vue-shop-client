import Vue from 'vue'
import Vuex from 'vuex'
import product from './modules/product.module'
import cart from './modules/cart.module'
import auth from './modules/auth.module'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product,
    cart,
    auth
  }
})
