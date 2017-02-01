import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
	currentRoom: null,
	rooms: {
		/*
		id:{
			id,
			name,
			msgs: [..ids],
			lastMsg,
			unreadNum,
			usr: [..name]

		}
		*/
	},
	msgs: {
		/*
		id: {
			id,
			roomId,
			owner,
			content,
			timestamp,
			type
		}
		 */
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}