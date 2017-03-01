空余时间段
每样作业的时间段
a{
	cost:3min,
	weight:5
}
const RoomManger = function() {
	if(!this instanceof RoomManger){
		return new RoomManger()
	}
	this.name = 
}

RoomManger.prototype = {
	constructor: RoomManger, //避免简写的prototype改变constructor的指向
	name: '',
	say: function(){

	}
}

export default RoomManger