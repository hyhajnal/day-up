import io from 'socket.io-client'
import store from '../store'

let socket,usrId,usrName,usrAvator,usr

export function init(){
	socket = io.connect(store.state.serverHost)
}

export function setInfo() {
	usr = store.state.usr
	usrId = usr._id
	usrName = usr.name
	usrAvator = usr.avator
}

//监听后台传来的消息
export function listen_login( roomId ){
	
	socket.on('login' + roomId, function(obj){
		/*谁谁加入了聊天室*/
		store.dispatch('login', { 
			name: obj.usrName, 
			content: obj.usrName + "加入了聊天室",
			roomId,
			type: 3
		})
	})

}

export function listen_logout(roomId){
	socket.on('logout' + roomId, function(obj){
		/*谁谁退出了聊天室*/
		store.dispatch('logout', {
		 	name: obj.usrName, 
		 	content: obj.usrName + "退出了聊天室",
		 	roomId ,
		 	type: 4
		})
	})
}

export function listen_msg(roomId){
	socket.on('sendMsg' + roomId, function(obj){
		/*谁谁说了什么*/
		store.dispatch('sendMsg', { 
			name: obj.usrName,
			content: obj.content, 
			roomId,
			avator: obj.usrAvator,
			type: usrName == obj.usrName ? 0 : 1
		})
	})
}

//向后台发送消息
export function login( roomId ){
	setInfo()
	socket.emit('login', { usrId: usrId, usrName: usrName, roomId: roomId })
}

export function logout( roomId ){
	setInfo()
	socket.emit('logout', { usrId: usrId, usrName: usrName, roomId: roomId })
}

export function sendMsg( content, roomId, type){
	setInfo()
	socket.emit('sendMsg', { usrId: usrId, usrName: usrName, 
		usrAvator: usrAvator, roomId: roomId, content: content})
}