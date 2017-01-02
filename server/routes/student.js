var StuCtrl = require('../controller/student')

var stuFun = function(app) {

	app.get('/server/student/tasks',StuCtrl.getTasksByDate)

}

module.exports = stuFun

/*var s_date = new Date(2016,9,1);
var e_date = new Date(2016,12,1);*/