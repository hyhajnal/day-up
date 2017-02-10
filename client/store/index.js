import Vue from 'vue'
import Vuex from 'vuex'

import chat from './chatroom'
//import * as shopCart from './shopCart'
import shopCart from './shopCart'
import todo from './todo'

Vue.use(Vuex)

const state = {
	serverHost: '192.168.2.2:3000',
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