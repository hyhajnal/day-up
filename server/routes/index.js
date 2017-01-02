var express = require('express')
var router = express.Router()
var stuFun = require('./student')
var tchFun = require('./teacher')

module.exports = function(app){

	//设置跨域访问
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*")
	    res.header("Access-Control-Allow-Headers", "X-Requested-With")
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS")
	    res.header("X-Powered-By",' 3.2.1')
	    /*res.header("Content-Type", "application/json;charset=utf-8");*/
	    next()
	})

	//学生端的方法
	stuFun(app)

	//老师端的方法
	tchFun(app)
}