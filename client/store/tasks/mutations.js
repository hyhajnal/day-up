import * as types from './mutation_types'
import { set } from 'Vue'

export const actions = {
  initTasks ({ commit }, tasks) {
    commit( types.INIT_TASKS, tasks )
  },
  addItem ({ commit }, text){
    commit( types.ADD_ITEM, text )
  },
  deleteItem ({ commit }, item){
    commit( types.DELETE_ITEM, item )
  },
  toogleItem ({ commit }, item){
    commit( types.TOOGLE_ITEM, item)
  },
  editItem ({ commit }, paylod){
    commit( types.EDIT_ITEM, paylod )
  },
  toggleAll ({ commit }, done){
    commit( types.TOOGLE_ALL, done )
  },
  addScore ({ commit }, paylod){
    commit( types.ADD_SCORE, paylod)
  },

  //进程操作
  init_pcbs ({ commit }, pcbs) {
  	commit( types.INIT_PCBS, pcbs )
  },

  switch_pcb ({ commit }, index) {
  	commit( types.SWITCH_PCB, index)
  },

  done_pcb ({ commit }, index) {
  	commit( types.DONE_PCB, index)
  }

}

export const mutations = {
	[types.INIT_TASKS] (state, tasks) {
		state.items = tasks
	},
	[types.ADD_ITEM] (state, {text}) {
		state.items.push({
			content: text,
			done: false,
			tag: '计划',
			type: 2
		})
	},
	[types.DELETE_ITEM] (state, { item }) {
		state.items.splice(state.task.items.indexOf(item), 1)
	},
	[types.EDIT_ITEM] (state, { item, value }) {
		item.content = value
	},
	[types.TOOGLE_ITEM] (state, item) {
		item.done = !item.done
	},
	[types.TOOGLE_ALL] (state, { done }) {
		state.items.forEach( (item) => {
			item.done = done
		})
	},
	[types.ADD_SCORE] (state, {item, score}) {
		set(item, 'score', score)
	},


	//进程操作
	[types.INIT_PCBS] (state, pcbs) {
		pcbs.forEach( pcb => {
			state.pcbs.push(createPCB(pcb))
		})
	},
	[types.SWITCH_PCB] (state, index) {
		state.currentPCB = index
	},
	[types.DONE_PCB] (state, index) {
		state.pcbs[index].done = true
	}
}

function createPCB({ lastTime, contentId}) {
	const timestamp = Date.now()
	const id = 'pcb' + timestamp
	const pcb = {
		id,
		contentId,
		lastTime
	}
	return pcb
}
