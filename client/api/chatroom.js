import { chatData } from './chatData'

export function getAllMsgs (cb) {
	cb(chatData.msgs)
}

export function createMsg ({name, content, avator, roomId, type}, cb) {
	const timestamp = Date.now()
	const id = 'm_' + timestamp
	const msg = {
		id,
		content,
		timestamp,
		roomId,
		type,
		avator,
		owner: name
	}

	cb(msg)
}

export function createRoom ({id, name, usr}, cb) {
	const room = {
		id,
		name,
		usr,
		msgs: [],
		lastMsg: {
			owner: '',
			content: ''
		},
		unreadNum: 0
	}

	cb(room)
}