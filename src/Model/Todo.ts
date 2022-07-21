import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	}
});

export default mongoose.model("TodoModel", TodoSchema);