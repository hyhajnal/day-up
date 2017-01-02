var task = require('../models/Task');
var Task = task.Task;

var task_type = require('../models/TaskType');
var TaskType = task_type.TaskType;

module.exports = {
	getAllTask:function(cb){
		TaskType.find({})
		.exec(function(err, tasks){
			if(err){
				cb(err,null);
			}else{
				cb(null,tasks);
			}
		});
	},
	getOneTask:function(id,cb){
		Task.findById(id)
		.exec(function(err, task){
			if(err){
				cb(err,null);
			}else{
				cb(null,task);
			}
		});
	}
}