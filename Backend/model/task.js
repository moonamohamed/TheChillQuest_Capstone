import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
      type: String,
      required: true  
    },
    completed: {
        type: Boolean,
        default: false
    },
    category: {
        type: String,
        enum: ['quest', 'habit', 'daily'],
        default: 'quest'
    }, });

export default mongoose.model("Task", taskSchema);