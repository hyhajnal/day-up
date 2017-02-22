var express = require('express')
var router = express.Router()
var stuFun = require('./student')
var tchFun = require('./teacher')

module.exports = function(app){

	//设置跨域访问
	//allow custom header and CORS
	app.all('*',function (req, res, next) {
	  res.header('Access-Control-Allow-Origin', '*');
	  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

	  if (req.method == 'OPTIONS') {
	    res.send(200); /让options请求快速返回/
	  }
	  else {
	    next();
	  }
	});
	

	//学生端的方法
	stuFun(app)

	//老师端的方法
	tchFun(app)
}