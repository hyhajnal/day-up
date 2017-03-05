var express = require('express')
var router = express.Router()
var stuFun = require('./student')
var tchFun = require('./teacher')

module.exports = function(app){

	//设置跨域访问
	//allow custom header and CORS
	app.all('*',function (req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*')
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

	  //非简单请求,在跨域时，浏览器会默认自动帮你发一个OPTIONS请求(preflight)，
	  //得到服务器响应后，再发送真正的请求
	  if (req.method == 'OPTIONS') {
	  	console.log('this is a option')
	    res.sendStatus(204) //让options请求快速返回，如果状态码为 200，还得携带多余的响应体，多余的
	  }
	  else {
	    next()
	  }
	})
	

	//学生端的方法
	stuFun(app)

	//老师端的方法
	tchFun(app)
}