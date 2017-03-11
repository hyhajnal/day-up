import { groupBy, forIn, findIndex} from 'lodash' 

export const items = state => state.items

export const currentTasks = state => { 
	const taskList = []
	const r1 = groupBy(state.items, (n) => {
		return n.tag
	})
	forIn(r1, (value, key) => {
	  let item = {
	  	name: key,
	  	items: value
	  }
	  taskList.push(item)
	})
	return taskList ? taskList : null
}

export const pcbs = state => {

	if(!state.pcbs){
		return []
	}else{
		let pcbs_o = []
		state.pcbs.forEach( pcb => {
			let pure_pcb = normalizeMap(pcb)
			if(!pure_pcb.special){  //如果不是特殊任务，在items[]中找出对应项
				pure_pcb.contentId = findTskbyId(state, pure_pcb.contentId)
				
			}
			pcbs_o.push(pure_pcb)
		})
		return pcbs_o
	}
}

/*export const currentPCB = state => {
	let currentPCB
	const time = new Date()
	const time_size = time.getHours() * 60 + time.getMinutes()

	const idx = findIndex(state.pcbs, function(pcb) {
					const s_size = parseInt(getTimeSize(pcb.s_time))
					const e_size = parseInt(getTimeSize(pcb.e_time))
					return s_size < time_size && e_size > time_size
				})
	const notStrat = time_size < parseInt(getTimeSize(state.pcbs[0].s_time))

	if(idx == -1 && !notStrat){
		state.currentPCB = -1
		return null
	}else{
		const i = notStrat ? 0 : idx
		state.currentPCB = i
		currentPCB = state.pcbs[0]

		let pcb = normalizeMap(currentPCB)
		if(!pcb.special){
			pcb.contentId = findTskbyId(state, pcb.contentId) 
		}
		return pcb
	}
	
}*/

function normalizeMap (data) {
    let pure_data = {}

	forIn(data, function(value, key) {
	  pure_data = Object.assign(pure_data,{[key]:value})
	})

	return pure_data
}

//根据id找出对应的task
function findTskbyId(state, id){
	let item_o
	state.items.forEach( item => {
		if(item.id == id){
			item_o = item
		}
	})

	return normalizeMap(item_o)

}

/*function getTimeSize(str){
	const h = parseInt(str.split(':')[0])
	const s = parseInt(str.split(':')[1])
	return h * 60 + s
}*/