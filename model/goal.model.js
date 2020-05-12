const mongoose = require('mongoose')

const GoalSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		required: true
	}
})

const GoalModel = mongoose.model('Goal', GoalSchema)

module.exports = GoalModel
