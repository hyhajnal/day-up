import Vue from 'vue'
import Vuex from 'vuex'

import chat from './chat'
//import * as shopCart from './shopCart'
import shopCart from './shopCart'
import todo from './todo'

Vue.use(Vuex)

const state = {
	serverHost: '192.168.2.2:3000'
}

export default new Vuex.Store({
  	state,
	modules: {
		chat: chat,
		shopCart: shopCart,
	    todo: todo
	}
})