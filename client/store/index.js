import Vue from 'vue'
import Vuex from 'vuex'

import chat from './chatroom'
import task from './tasks'

Vue.use(Vuex)

const state = {
	/*serverHost: 'http://1659x1818m.imwork.net:31744',*/
  /*serverHost: 'http://192.168.1.101:3000',*/
  serverHost: 'http://192.168.2.7:3000',
  /*serverHost: 'http://localhost:3000',*/
  bottom: true,
  sidebar: false

}
 
const mutations = {
	setBottom (state, flag) {
		state.bottom = flag
	},
  setSidebar (state, flag) {
    state.sidebar = flag
  }
}


export default new Vuex.Store({
  state,
  mutations,
	modules: {
		chat: chat,
    task: task
	}
})