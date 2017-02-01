export const rooms = state => state.rooms

export const currentRoom = state => {
	return state.currentRoom
		? state.rooms[state.currentRoom]
		: {}
}

export const currentMsgs = state => {
	const room = currentRoom(state)
	return room.msgs
		? room.msgs.map(id => state.msgs[id]) //用map将room.msgs的每一项进行扩展
		: []
}