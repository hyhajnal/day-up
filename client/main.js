import 'babel-polyfill'  //解析字符
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import store from './store'
import App from './App'
import { routes } from './route-config'

import { getAllMsgs } from './store/chatroom/actions'

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import { currency } from './filter/currency'

//测试自己的ui组件
import HyUI from '../ui_libs'

//移动端click 300ms延迟问题
import FastClick from 'fastclick'
FastClick.attach(document.body)


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Mint)
Vue.use(HyUI)

const router = new VueRouter({
	/*mode: 'history',*/ //HTML5 History 模式
    base: __dirname,
  	routes 
})

//全局通用filter
Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.filter('currency', currency)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/*getAllMsgs(store)*/



