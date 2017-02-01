import io from 'socket.io-client'
import store from '../store'

let socket = null
const usrId = localStorage.getItem('usrId')
const usrName = localStorage.getItem('usrName')
const usrAvator = localStorage.getItem('usrAvator')

export function init( roomId ){
	//连接
	/*socket = io.connect('http://192.168.137.1:3000/')*/
	socket = io.connect('http://192.168.1.101:3000')


	//监听后台传来的消息
	//
	socket.on('login' + roomId, function(obj){
		/*谁谁加入了聊天室*/
		store.dispatch('login', { 
			id: obj.id, 
			name: obj.name, 
			roomId 
		})
	})

	socket.on('logout' + roomId, function(obj){
		/*谁谁退出了聊天室*/
		//socket.discount()
		store.dispatch('logout', {
		 	id: obj.id, 
		 	name: obj.name, 
		 	roomId 
		})
	})

	socket.on('sendMsg' + roomId, function(obj){
		/*谁谁说了什么*/
		store.dispatch('sendMsg', { 
			name: obj.usrName,
			content: obj.content, 
			roomId,
			type: usrName == obj.usrName ? 0 : 1
		})
	})

}

//向后台发送消息
export function login( roomId ){
	socket.emit('login', { usrId: usrId, usrName: usrName, roomId: roomId })
}

export function logout( roomId ){
	console.log('logout_before')
	socket.emit('logout', { usrId: usrId, usrName: usrName, roomId: roomId })
}

export function sendMsg( content, roomId, type){
	socket.emit('sendMsg', { usrId: usrId, usrName: usrName, roomId: roomId, content: content})
}