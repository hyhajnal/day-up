import {mutations, actions} from './mutations'
import * as getters from './getters'

const state = {
	/*tasks: {
		id: {
			id,
			name,
			items: [..ids],
			isDown  //是否折叠
		}
	},*/
	/*items: [
		{
			id,
			content,
			done,
			score,
			tag, //科目的名称
			type //0-线上，1-线下，2-自己的安排
		}
	]*/
	items: null
}

export default {
	state,
	getters,
	actions,
	mutations
}