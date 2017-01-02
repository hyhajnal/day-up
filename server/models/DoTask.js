var mongoose = require('mongoose')
var Schema = mongoose.Schema

var DoTaskSchema = new Schema({
	sid: { type: Schema.Types.ObjectId, ref: 'Student' },
	taskId: { type: Schema.Types.ObjectId, ref: 'Task' },
	score: { type: Number, default: -1 },
	complete: { type: Boolean, default: false },
	wrongInfo: [ String ]
});

module.exports = mongoose.model('DoTask', DoTaskSchema);


