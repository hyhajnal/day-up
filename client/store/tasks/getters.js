import {groupBy, forIn} from 'lodash' 


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