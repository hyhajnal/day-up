var path = require('path')
var express = require('express')
var webpack = require('webpack')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var config = require('../config')
var auth = require('./common/auth')
var opn = require('opn')
//http-proxy-middleware(代理转发中间件)
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('../build/webpack.dev.conf')
//日志
var log4js = require('log4js')
var logger = require('./common/logger')
var Promise = require('bluebird')
var routes = require("./routes/index")
var sockets = require('./socket/index')
//开启gzip  
var compression = require('compression')
var redis = require('redis')
/*    redisClient = redis.createClient() */
var session = require('express-session')
var RedisStore = require('connect-redis')(session)

//mongoose.Promise = global.Promise;
//to solve this problem:Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html

//bluebird将mongooseAPI转换成Promise
Promise.promisifyAll(mongoose)

mongoose.connect(config.dev.db)


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

//开启gzip
app.use(compression())

/*redisClient.on('ready', function(err){
  console.log('ready')
})
*/


app.use(require('cookie-parser')(config.dev.session_secret))
//redis存储session
app.use(session({
  secret: config.dev.session_secret, //要与cookie-parser保持一致
  store: new RedisStore({
    port: config.dev.redis_port,
    host: config.dev.redis_host,
    db: config.dev.redis_db,
    pass: config.dev.redis_password,
  }),
  logErrors: true,
  resave: false,
  saveUninitialized: false,
}))



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


//配置API输出时的日志
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url' }))


app.use(devMiddleware)
app.use(hotMiddleware)

//判断用户的登录状态
//app.use(auth.authUser)
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
    logger.error(err)
    return
  }
  var uri = 'http://localhost:' + port
  logger.info('Listening at ' + uri + '\n')
  opn(uri)
})


//socket.io
//var server = app.listen(3000)
var io = require('socket.io').listen(server)

sockets(io)

module.exports = server
