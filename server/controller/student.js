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
var logger     = require('../common/logger')
var auth       = require('../common/auth')

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

function saveImg(userId,imgData){
	logger.info('saveImg...')
	console.log(imgData)
	if(!imgData || imgData == ''){
		ep.emit('saveImg',"/images/avator/empty.png")
		return
	}
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64Data, 'base64')
    var timestamp = new Date().getTime()
    var imgurl = "/images/avator/"+ userId + timestamp +".png"
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
		logger.info('登陆传参...',req.body)
		Student.findOneAsync({
			name: username
		})
		.then(function(student){
			logger.info('登陆...',student)
			if(!student){
				resjson(res,true,null,'用户名不存在')
			}else if(student.password != password){
				resjson(res,true,null,'密码不正确')
			}else{
				// store session cookie
      	auth.gen_session(student, req, res)
				resjson(res,true,student,'登陆成功')
			}
		})
		.catch(function(err){
			return next(err)
		})
	},

	register:function(req, res, next){
		var newStudent = new Student()
		//var md5psd = utility.md5(req.body.password)
		//utils.md5('苏千').should.equal('5f733c47c58a077d61257102b2d44481')

		//保存图片
		saveImg(req.body.username,req.body.avator)
		ep.all('saveImg', function (data) {
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
						logger.info('注册....',student)
						resjson(res,true,student,'注册成功')
					})
					.catch(function(err){
						resjson(res,true,null,'创建失败')
						return next(err)
					})
				}
			})
			.catch(function(err){
				resjson(res,false,null,'服务器出错')
				return next(err)
			})
		})
	},


	postImg: function (req, res, next){
		var path = '/uploads/'+ req.file.filename
		console.log(req.file)
		logger.info('oldPath....',req.body.oldPath)
		fs.unlinkSync('static' + req.body.oldPath) //删除原图片
		Student.findByIdAndUpdateAsync({
			_id: req.session.user._id
		}, {$set: { avator:path }},{ upsert: true, new: true})
		.then(function(student){
			console.log(student)
			if(student){
				resjson(res,true,student,'图片上传成功')
			}else{
				resjson(res,null,student,'图片上传失败')
			}
		})
		.catch(function(err){
			resjson(res, false, null, "服务器出错")
			return next(err)
		})

	},

	// sign out
	signout: function (req, res, next) {
	  req.session.destroy();
	  res.clearCookie('homework_everyday', { path: '/' });
	  res.redirect('/');
	},

	
	//查询当天或者一段时间的作业及完成情况
	getTasksByDate: function(req, res, next){ 
		logger.info('查询日期...',req.query.date)
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
						  	return next(err)
						  })
					})
					
				})
				

				ep.after('task_ready', n, function(){
					logger.info('查询作业...',tasks)
					resjson(res,true,tasks,'')
				})
			})
			.catch(function(err){
				res.send('error')
				return next(err)
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