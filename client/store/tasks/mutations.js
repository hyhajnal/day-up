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
}