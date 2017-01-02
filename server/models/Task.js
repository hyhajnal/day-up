var mongoose = require('mongoose')
var Schema = mongoose.Schema

var TaskSchema = new Schema({
	tid: String,
	cid: String,
	type: String,
	s_date: { type: Date, default: Date.now },
	e_date: Date,
	content: String,
	external: [ String ]
});

module.exports = mongoose.model('Task', TaskSchema)

/*module.exports = mongoose.model('task', TaskSchema);*/

/*var start = new Date(2010, 3, 1);
var end = new Date(2010, 4, 1);

tid: { types: Schema.ObjectId, ref: Teacher.TeacherSchema },
db.getCollection('task').find({"s_date": {$gt:new Date(2016,4,1),$lt: new Date(2016,12,1)}})

db.posts.find({created_on: {$gte: start, $lt: end}});

{$match: {s_date:{$gt:new Date(2016,4,1),$lt: new Date(2016,11,1)}}}
db.tasks.aggregate([
{$group: {_id: '$type', items: {$push: "$$ROOT"}}}
])
*/
