import { findIndex } from 'lodash'

function getTimeSize(str){
	const h = parseInt(str.split(':')[0])
	const m = parseInt(str.split(':')[1])
	return h * 3600 + m * 60
}

const countNow = function (pcbs){
	const time = new Date()
	const time_size = time.getHours() * 3600 + time.getMinutes() * 60 + time.getSeconds()

	//找到当前时间对应的卡片
	const idx = findIndex(pcbs, function(pcb) {
					const s_size = parseInt(getTimeSize(pcb.s_time))
					const e_size = parseInt(getTimeSize(pcb.e_time))
					return s_size < time_size && e_size > time_size
				})

	const notStrat = time_size < parseInt(getTimeSize(pcbs[0].s_time)) //有没有开始

	return notStrat ? 0 : idx
}

export default countNow