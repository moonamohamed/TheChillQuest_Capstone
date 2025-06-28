import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    usrname: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    xp: {
        type: Number,
        default: 0
    },
    level: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);