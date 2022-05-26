import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	task: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	},
});

export default mongoose.model("Todo", TodoSchema);