var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClassroomSchema = new Schema({
	sid: { type: Schema.Types.ObjectId, ref: 'Student' },
	tid: { type: Schema.Types.ObjectId, ref: 'Teacher' },
	name: String,
	maxnum: Number,
	teachers: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }],
	students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Classroom', ClassroomSchema),
