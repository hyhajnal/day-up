/*
 * bluebird 代替mongoose的Promise
 * eventproxy 控制异步事件流程
 */
var Promise    = require('bluebird')
var EventProxy = require('eventproxy')
var utility    = require('utility')  //md5加密
var fs         = require("fs")

var Task 	   = require('../models/Task')
var DoTask     = require('../models/DoTask')
var Student    = require('../models/Student')

var ep         = new EventProxy()

function resjson(res,isSuccess,data,msg){
	var result = {
		success: isSuccess ? true: false,
		data: data
	}
	if(msg != ''){
		result = Object.assign(result, {msg: msg})
	}

	res.json(result)

}

function saveImg(username,imgData){
	console.log('saveImg')
	ep.emit('test','haha')
	if(!imgData || imgData == ''){
		ep.emit('saveImg',"/images/avator/empty.png")
		return
	}
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')
    var timestamp = new Date().getTime()
    var imgurl = "/images/avator/"+ username + timestamp +".png"
    fs.writeFile(imgurl, dataBuffer, function(err) {
        if(err){
          ep.emit('saveImg',{err:true})
        }else{
          ep.emit('saveImg',imgurl)
        }
    })
}

module.exports = {

	login:function(req, res, next){
		var username = req.body.username
		var password = req.body.password
		console.log(req.body)
		Student.findOneAsync({
			name: username
		})
		.then(function(student){
			console.log(student)
			if(!student){
				resjson(res,true,null,'用户名不存在')
			}else if(student.password != password){
				resjson(res,true,null,'密码不正确')
			}else{
				resjson(res,true,student,'登陆成功')
			}
		})
		.catch(function(err){
			resjson(res,false,null,'服务器出错')
		})
	},

	register:function(req, res, next){
		var newStudent = new Student()
		//var md5psd = utility.md5(req.body.password)
		//utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481')

		//保存图片
		saveImg(req.body.username,req.body.avator)
		ep.all('saveImg','test', function (data,data2) {
			conosle.log(data2)
			if(data.err){
				resjson(res,true,null,'图片保存失败')
				return
			}
		    newStudent.name = req.body.username
			newStudent.password = req.body.password
			newStudent.avator = data

			Student.findOneAsync({
				name: req.body.username
			})
			.then(function(student){
				if(student){
					resjson(res,true,null,'用户名已存在')
				}else{
					newStudent.saveAsync()
					.then(function(student){
						console.log(student)
						resjson(res,true,student,'注册成功')
					})
					.catch(function(err){
						resjson(res,true,null,'创建失败')
					})
				}
			})
			.catch(function(err){
				resjson(res,false,null,'服务器出错')
			})
		})
	},

	
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
				 
				//var ep = new EventProxy()
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
					resjson(res,true,tasks,'')
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