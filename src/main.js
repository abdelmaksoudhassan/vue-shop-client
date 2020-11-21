import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import  Element  from 'element-ui'
import './assets/css/element.css'
import './assets/css/style.css'
import 'animate.css'
import Vuelidate from 'vuelidate'
import moment from 'moment'

axios.defaults.baseURL = 'https://e-combackend.herokuapp.com'

Vue.use(Element)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.filter('dollar-sign',(value)=>{
  return value + ' $'
})
Vue.filter('fromNow',(value)=>{
  return moment(new Date(value), "YYYYMMDD").fromNow();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')