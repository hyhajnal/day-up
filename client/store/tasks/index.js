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
	spareTime:{
		timeline: [
			{
				clock: '17:00-18:00',
				cost: 60   //1小时
			},
			{
				clock: '18:30-21:00',
				cost: 150  //2小时半
			},

		],
		releasTtime: 10, //休息时间
		focusTime: 40  //注意力最久能持续的时间
	},
	currentPCB: 0,
	pcbs: [
		{
			s_time: '17:00',
			e_time: '17:15',	
			done: false,
			contentId: '584cb845ff9c22c42ba7c6c9'
		},
		{
			s_time: '17:15' ,
			e_time: '17:25',
			done: false,
			contentId: '584cb8a4ff9c22c42ba7c6ca'
		},
		{
			s_time: '17:25',
			e_time: '17:40',
			done: false,
			contentId: '584cc967ff9c22c42ba7c6cc'
		},
		//40分钟
		{
			s_time: '17:40',
			e_time: '17:50',
			done: false,
			special: true,
			content: '休息'
		},
		{
			s_time: '17:50',
			e_time: '17:55',
			done: false,
			contentId: '584cc967ff9c22c42ba7c6cc'
		},
		//-----------------------------------------吃饭18:00---------------------------------------
		{
			s_time: '18:00',
			e_time: '18:30',
			done: false,
			special: true,
			content: '吃饭'
		},
		//-----------------------------------------吃饭结束18:30---------------------------------------
		{
			s_time: '18:30',
			e_time: '18:50',
			done: false,
			contentId: '584cb8a4ff9c22c42ba7c6ca'
		},
		{
			s_time: '18:50',
			e_time: '19:10',
			done: false,
			contentId: '584cc9a0ff9c22c42ba7c6cd'
		},
		{
			s_time: '19:10',
			e_time: '19:20',
			done: false,
			special: true,
			content: '休息'
		},
		{
			s_time: '19:20',
			e_time: '19:30',
			done: false,
			contentId: '584cc9a0ff9c22c42ba7c6cd'
		},
		{
			s_time: '19:30',
			e_time: '20:00',
			done: false,
			contentId: '584cc9d6ff9c22c42ba7c6ce'
		}
	//-----------------------------------------睡觉时间21:00---------------------------------------
	]
}

export default {
	state,
	getters,
	actions,
	mutations
}