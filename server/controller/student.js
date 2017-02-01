/*
 * bluebird 代替mongoose的Promise
 * eventproxy 控制异步事件流程
 */
var Task 	   = require('../models/Task')
var DoTask     = require('../models/DoTask')
var Promise    = require('bluebird')
var EventProxy = require('eventproxy')


function resjson(res,isSuccess,data,msg){
	var result = {
		success: isSuccess ? true: false,
		data: data
	}
	if(msg != null){
		data.msg = msg
	}

	res.json(result)

}

module.exports = {
	
	//查询当天或者一段时间的作业及完成情况
	getTasksByDate: function(req, res, next){ 
		console.log(req.query.date)
		var date = req.query.date.split('/')
		var sid = '584c0e7c672750e6d9e6a9ee'
		var n = 0

		Task.aggregateAsync(
				/*{$match: {s_date:{$gt:new Date(date[0], date[1], date[2]),$lt: new Date(date[0], date[1], date[2]+1)}}},*/
				{$match: {s_date:{$lt: new Date(date[0], date[1], date[2])}}},
				{$group: {_id: '$type', items: {$push: "$$ROOT"}}}
			)
			.then(function(tasks){
				
				//两次循环，对请求的数据增加 complete字段
				tasks.forEach(function(task){
					n += task.items.length
				})
				 
				var ep = new EventProxy()
				tasks.forEach(function(task){
					task.items.forEach(function(subTask){
						DoTask.findOneAsync({sid:sid,taskId:subTask._id})
						  .then(function(stu_task){
						  		subTask.complete = stu_task ? true : false
						  		ep.emit('task_ready')
						  })
						  .catch(function(err){
						  	 console.log(err)
						  })
					})
					
				})
				

				ep.after('task_ready', n, function(){
					console.log(tasks)
					resjson(res,true,tasks,null)
				})
			})
			.catch(function(err){
				console.log(err)
				res.send('error')
			})

	}


}


/*TaskType
			.find({})
			.populate('children')
			.exec(function(err, tasks){
				if(err){
					callback(err,null)
				}else{
					console.log(tasks)
					callback(null,tasks)
				}
			});*/