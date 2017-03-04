/*//优先级按照index


//学生在小黑屋页面的排序而得
items: [
	{
		cost: 15,
		content: {'听写'}
	},
	{
		cost: 10,
		content: {'抄写'}
	},
	{
		cost: 30,
		content: {'数学'}
	},
	{
		cost: 20,
		content: {'背诵'}
	},
	{
		cost: 30,
		content: {'阅读'}
	},
	{
		cost: 30,
		content: {'体育锻炼'}
	}

]

//在侧栏喜好中填写，最后会存入state中
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

	]

	releasTtime: 10(5) //休息时间
	focusTime: 40(45)  //注意力最久能持续的时间
}


//经过计算需要得到的结果是
planList:[
	//-----------------------------------------放学回家17:00---------------------------------------
	{
		s_time: '17:00'  //设置一个计时
						 //如果完成 停止计时，设一个标志位
		e_time: '17:15'	 //设置一个闹钟，检查是否有标志位，没有的话设置未完成，并进行下一个任务
		done: true,
		content: {'听写'}
	},
	{
		s_time: '17:15'  //设置一个计时
						 //如果完成 停止计时
		e_time: '17:25'	 //设置一个闹钟	
		content: {'抄写'}
	},
	{
		cost: 15,
		content: {'数学'}
	},
	//40分钟
	{
		cost: 10,
		content: {'休息'}
	},
	{
		cost: 5,
		content: {'数学'}
	},
	{
		'多余5分钟'
	},
	//-----------------------------------------吃饭18:00---------------------------------------
	{
		cost: 30,
		content: {'吃饭'}
	},
	//-----------------------------------------吃饭结束18:30---------------------------------------
	{
		cost: 20,
		content: {'背诵'}
	},
	{
		cost: 20,
		content: {'体育锻炼'}
	},
	{
		cost: 10,
		content: {'休息'}
	},
	{
		cost: 10,
		content: {'体育锻炼'}
	},
	{
		cost: 30,
		content: {'阅读'}
	}
	//-----------------------------------------睡觉时间21:00---------------------------------------

]




/*const PlanManger = function(items,sparetime) {
	if(!this instanceof PlanManger){
		return new PlanManger()
	}
	this.name = 
}

PlanManger.prototype = {
	constructor: PlanManger, //避免简写的prototype改变constructor的指向
	name: '',
	say: function(){

	}
}

export default PlanManger*/