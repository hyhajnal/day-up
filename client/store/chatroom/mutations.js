import { set } from 'vue'
import * as types from './mutation-types'

export default {
	[types.RECEIVE_ALL] (state, { msgs }) {
		msgs.forEach(msg => {
			if(!state.rooms[msg.roomId]){
				createRoom(state, msg.roomId)
			}

			addMsg(state, msg)

		})
	},

	[types.SEND_MSG] (state, { msg }) {
		addMsg(state, msg)
	},

	[types.CHANGE_ROOM] (state, { id }) {
		changeRoom(state, id)
	},

	[types.LOGIN] (state, { msg }) {
		addMsg(state, msg )
		login(state, msg )
	},

	[types.LOGOUT] (state, { msg }) {
		addMsg(state, msg)
		logout(state, msg)
	}
}

/*Vue.set(object,key,value)*/

function createRoom(state, id){
	set(state.rooms, id, {
		id,
		name: "n" + id,
		msgs: [],
		usr: [],
		lastMsg: null,
		unreadNum: 0
	})
}
function addMsg(state, msg){
	set(state.msgs, msg.id, msg)
	const room = state.rooms[msg.roomId]
	if(! room.msgs.some(id => id === msg.id)){
		room.msgs.push(msg.id)
		room.lastMsg = msg
	}

	if(state.currentRoom != msg.roomId){
		room.unreadNum ++
	}else{
		room.unreadNum = 0
	}

}


function changeRoom(state, roomId){
	state.currentRoom = roomId 
}

function login(state, msg){
	const usr = {
		id: localStorage.getItem('usrId'),
		name: localStorage.getItem('usrName')
	}
	state.rooms[msg.roomId].usr.push(usr)

}

function logout(state, msg){
	const usrId = localStorage.getItem('usrId')
	const usrList = state.rooms[msg.roomId].usr
	console.log(usrList)
	const index = usrList.findIndex(function(usr, index, arr){
		return usr.id = usrId
	})
	usrList.splice(index, 1)
}