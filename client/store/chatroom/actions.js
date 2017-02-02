import * as api from '../../api/chatroom'
import * as types from './mutation-types'

//mock数据
/*export const getAllMsgs = ({ commit }) => {
	api.getAllMsgs(msgs => {
		commit(types.RECEIVE_ALL, {
			msgs
		})
	})
}*/

//如果不在当前房间，未读消息+1
//更改lastMsg
//推送消息
export const sendMsg = ({ commit }, payload) => {
	api.createMsg(payload, msg => {
		//传对象参数，优先用解构{msg}
		commit(types.SEND_MSG, {
			msg
		})
	})
}


export const changeRoom = ({ commit }, payload) => {
	commit(types.CHANGE_ROOM, payload)
}


export const add_room = ({ commit }, payload) => {
	api.createRoom(payload, room => {
		commit(types.ADD_ROOM, {
			room
		})
	})
}

//推送消息
//usrList增加此人
export const login = ({ commit }, payload) => {
	api.createMsg(payload, msg => {
		//传对象参数，优先用解构{msg}
		commit(types.LOGIN, {
			msg
		})
	})
}


//推送消息
//usrList删去此人
export const logout = ({ commit }, payload) => {
	api.createMsg(payload, msg => {
		//传对象参数，优先用解构{msg}
		commit(types.LOGOUT, {
			msg
		})
	})
}

