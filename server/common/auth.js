var eventproxy = require('eventproxy')
var config = require('../../config')

/**
 * 需要登录
 */
exports.userRequired = function (req, res, next) {
  console.log(req.session)
  if (!req.session || !req.session.user || !req.session.user._id) {
    return res.status(403).send('需要登录!')
  }

  next()
}

function gen_session(user, req, res) {
  req.session.user = user
  var auth_token = user._id + '$$$$' // 以后可能会存储更多信息，用 $$$$ 来分隔
  var opts = {
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 30,
    signed: true,
    httpOnly: true
  }
  res.cookie(config.dev.auth_cookie_name, auth_token, opts) //cookie 有效期30天
}


// 验证用户是否登录
// exports.authUser = function (req, res, next) {
//   var ep = new eventproxy()
//   ep.fail(next)

//   // Ensure current_user always has defined.
//   res.locals.current_user = null

//   if (config.debug && req.cookies['mock_user']) {
//     var mockUser = JSON.parse(req.cookies['mock_user'])
//     req.session.user = new UserModel(mockUser)
//     if (mockUser.is_admin) {
//       req.session.user.is_admin = true
//     }
//     return next()
//   }

//   ep.all('get_user', function (user) {
//     if (!user) {
//       return next()
//     }
//     user = res.locals.current_user = req.session.user = new UserModel(user)

//     if (config.admins.hasOwnProperty(user.loginname)) {
//       user.is_admin = true
//     }

//     Message.getMessagesCount(user._id, ep.done(function (count) {
//       user.messages_count = count
//       next()
//     }))
//   })

//   if (req.session.user) {
//     ep.emit('get_user', req.session.user)
//   } else {
//     var auth_token = req.signedCookies[config.auth_cookie_name]
//     if (!auth_token) {
//       return next()
//     }

//     var auth = auth_token.split('$$$$')
//     var user_id = auth[0]
//     UserProxy.getUserById(user_id, ep.done('get_user'))
//   }
// }

exports.gen_session = gen_session