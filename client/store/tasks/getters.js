import { groupBy, forIn, findIndex} from 'lodash' 
/*const r2 = _.groupBy([{a:"haha", b:2, c:3},{a:"aha",b:4},{a:"haha",c:2},{a:"hah",c:3}], function(n) {
  return n.a
})

//Object {haha: Array[2], aha: Array[1], hah: Array[1]}*/


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

export const currentPCB = state => {

	if(state.pcbs[state.currentPCB]){
		let pcb = normalizeMap(state.pcbs[state.currentPCB])
		if(!pcb.special){
			pcb.contentId = findTskbyId(state, pcb.contentId) 
		}
		return pcb
	}else{
		return {}
	}
	
}