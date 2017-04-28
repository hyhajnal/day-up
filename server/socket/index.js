var logger = require('../common/logger')

module.exports = function(io){

	io.on('connection', function(socket){
		logger.info('a user connected')
		
		//监听新用户加入
		socket.on('login', function(obj){			
			
			//向所有客户端广播用户加入
			io.emit('login' + obj.roomId, { usrId: obj.usrId, usrName: obj.usrName, roomId: obj.roomId })
			logger.info('加入了聊天室...',obj.usrName)
		})
		
		//监听用户退出
		socket.on('logout', function(obj){
			//向所有客户端广播用户退出
			io.emit('logout' + obj.roomId, { usrId: obj.usrId, usrName: obj.usrName, roomId: obj.roomId })
			logger.info('退出了聊天室...',obj.usrName)
		})
		
		//监听更改信息
		socket.on('sendMsg', function(obj){
			//向所有客户端广播发布的消息
			io.emit('sendMsg' + obj.roomId, { usrName: obj.usrName, usrAvator: obj.usrAvator, content: obj.content, roomId: obj.roomId })
			logger.info(obj.usrName + '说：' + obj.content)
		})
	  
	})

}