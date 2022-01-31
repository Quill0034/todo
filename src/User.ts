import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    pasasword: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("User", user);