import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	message: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	}
	},
	{ timestamps: true }
);

export default mongoose.model("MessageModel", MessageSchema);