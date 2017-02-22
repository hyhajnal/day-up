import mutations from './mutations'
import actions from './actions'

const state = {
	tasks: {
		/*id: {
			id,
			name,
			items: [..ids],
			isDown  //是否折叠
		}*/
	},
	items: {
		id: {
			id,
			content,
			done,
			score,
			tag, //科目
			type //0-线上，1-线下，2-自己的安排
		}
	}
}