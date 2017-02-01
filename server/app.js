var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('../config')
var opn = require('opn')
//http-proxy-middleware(代理转发中间件)
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('../build/webpack.dev.conf')
var log4js = require('log4js')
var Promise = require('bluebird')

var routes = require("./routes/index")
var sockets = require('./socket/index')

var db = 'mongodb://localhost/example'

//mongoose.Promise = global.Promise;
//to solve this problem:Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

//use bluebird
Promise.promisifyAll(mongoose)

mongoose.connect(db)

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()


//socket.io
/*var server = app.listen(3000)
var io = require('socket.io').listen(server)

sockets(io)*/


var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

//配置日志输出
log4js.configure({
  appenders: [
    { type: 'console' },//控制台输出
    { 
      type: 'file', //文件输出
      filename: 'log/access.log',
      maxLogSize: 1024,
      backups: 3,
      category: 'normal'
    }
  ]
})

//设置日志的默认输出为INFO，则不会打印出比INFO等级低的日志信息
/*
  *http responses 3xx, level = WARN
  *http responses 4xx & 5xx, level = ERROR
  *else, level = INFO
*/
var logger = log4js.getLogger('noraml')
logger.setLevel('INFO') 
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url' }))


app.use(devMiddleware)
app.use(hotMiddleware)
routes(app)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())


app.use(express.static(path.join(__dirname, '../static')))

var server = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})


//socket.io
/*var server = app.listen(3000)*/
var io = require('socket.io').listen(server)

sockets(io)

module.exports = server
