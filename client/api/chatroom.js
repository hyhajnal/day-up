import { chatData } from './chatData'

export function getAllMsgs (cb) {
	cb(chatData.msgs)
}

export function createMsg ({name, content, roomId, type}, cb) {
	const timestamp = Date.now()
	const id = 'm_' + timestamp
	const msg = {
		id,
		content,
		timestamp,
		roomId,
		type,
		owner: name
	}

	cb(msg)
}