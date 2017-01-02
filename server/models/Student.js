var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
	name: String,
	password: { type: String, default: '000000' },
	avator: String
});

module.exports = mongoose.model('Student', StudentSchema)