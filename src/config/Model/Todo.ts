import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	}
	
});

export default mongoose.model("TodoModel", TodoSchema);