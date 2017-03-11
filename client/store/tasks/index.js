import {mutations, actions} from './mutations'
import * as getters from './getters'

const state = {

	/*items: [
		{
			id,
			content,
			done,
			score,
			tag, //科目的名称
			type //0-线上，1-线下，2-自己的安排
		}
	]
	currentPCB: 0,   //当前执行的任务
	pcbs:[
		{
			id,
			lastTime,   //还剩下多少时间
			contentId: id //items[?]
		}
	]*/
	items: null,
	currentPCB: 0,
	pcbs: [
		{
			s_time: '00:52',
			e_time: '00:55',	
			done: false,
			contentId: '584cb845ff9c22c42ba7c6c9'
		},
		{
			s_time: '00:55' ,
			e_time: '00:56',
			done: false,
			contentId: '584cb8a4ff9c22c42ba7c6ca'
		},
		{
			s_time: '00:57',
			e_time: '01:06',
			done: false,
			contentId: '584cc967ff9c22c42ba7c6cc'
		},
		//40分钟
		{
			s_time: '01:37',
			e_time: '01:38',
			done: false,
			special: true,
			content: '休息'
		}
	]
}

export default {
	state,
	getters,
	actions,
	mutations
}