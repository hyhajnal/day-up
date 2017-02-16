import Vue from 'vue'
import Vuex from 'vuex'

import chat from './chatroom'
//import * as shopCart from './shopCart'
import shopCart from './shopCart'
import todo from './todo'

Vue.use(Vuex)

const state = {
	/*serverHost: 'http://1659x1818m.imwork.net:31744',*/
  serverHost: 'http://172.16.1.222:3000',
	ctrl: {
        header: true,
        bottom: true,
        title: 'STUDING',
        content: {
          icon1: 'back',
          icon2: 'more',
          url: '/'
        }
    }
}
 
const mutations = {
	setNavbar (state, ctrl) {
		state.ctrl = ctrl
	}
}


export default new Vuex.Store({
  state,
  mutations,
	modules: {
		chat: chat,
		shopCart: shopCart,
	    todo: todo
	}
})