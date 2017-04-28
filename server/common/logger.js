//log4j日志输出
var log4js = require('log4js')

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

//设置日志的默认输出为INFO，权值小于INFO的不会被打印
//也就是log.info(), log.warn(), log.error()或者log.fatal()会触发日志
/*
TRACE: new Level(5000, "TRACE"), 
DEBUG: new Level(10000, "DEBUG"), 
INFO: new Level(20000, "INFO"), 
WARN: new Level(30000, "WARN"), 
ERROR: new Level(40000, "ERROR"), 
FATAL: new Level(50000, "FATAL"),
*/
var logger = log4js.getLogger('noraml')
logger.setLevel('INFO') 

module.exports = logger