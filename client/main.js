import 'babel-polyfill'  //解析字符
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'
import App from './App'
import { routes } from './route-config'

import { getAllMessages } from './store/chat/actions'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import { currency } from './filter/currency'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Mint)

const router = new VueRouter({
	mode: 'history', //HTML5 History 模式
    base: __dirname,
  	routes 
})

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.filter('currency', currency)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

getAllMessages(store)



