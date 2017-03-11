import 'babel-polyfill'  //解析字符
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import VueLazyload from 'vue-lazyload'

import store from './store'
import App from './App'
import { routes } from './route-config'
import clickoutside from './directive/clickoutside'


/*import { getAllMsgs } from './store/chatroom/actions'*/

import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

//测试自己的ui组件
import HyUI from '../ui_libs'


//移动端click 300ms延迟问题
import FastClick from 'fastclick'
FastClick.attach(document.body)


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VeeValidate)
Vue.use(Mint)
Vue.use(HyUI)
Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'images/404.png',
  loading: 'images/loading.jpg',
  attempt: 1
})

const router = new VueRouter({
	/*mode: 'history',*/ //HTML5 History 模式
    base: __dirname,
  	routes 
})

//全局通用filter
Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

Vue.directive('clickoutside',clickoutside)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')




