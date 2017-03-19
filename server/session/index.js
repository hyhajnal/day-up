var express = require('express');
var session = require('express-session');
var redisStore = require('connect-redis')(session);

var app = express();
var options = {
     "host": "127.0.0.1",
     "port": "3000",
     "ttl": 60 * 60 * 24 * 30,   //Session的有效期为30天
};

// 此时req对象还没有session这个属性
app.use(session({
     store: new redisStore(options),
     secret: 'express is powerful'
}));
// 经过中间件处理后，可以通过req.session访问session object。
// 比如如果你在session中保存了session.userId就可以根据userId查找用户的信息了。
// 
// 
exports.signin = function(params, req, res){
    var username = params.username;
    var password = params.password;

    //查找用户信息，看是否满足登陆条件
    var user = findUser(username, password);
    if(user){
        //成功获取用户对象
        req.session.regenerate(function(){
            req.user = user;
            req.session.userId = user.id;
            req.session.save();  //保存一下修改后的Session

            res.redirect('/account');
        });  
    }
    else{
        //用户信息不符合，登陆失败
    }
}

exports.signout = function(req, res){
    req.clearCookie('connect.sid');
    req.user = null;

    req.session.regenerate(function(){
        //重新生成session之后后续的处理
        res.redirect('/signin');
    })
}

exports.persist = function(req, res, next){
    var userId = req.session.userId;

    //通过user id去数据库里面查找User对象
    var user = findUserById(userId);

    if(user){
        req.user = user;
        next();
    }
    else{
        //该用户不存在
    }
}

