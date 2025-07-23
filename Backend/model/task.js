import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    {
        text: {type: String},
        completed: {type: Boolean, default: false},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }
);

const Task = mongoose.model('Task', taskSchema)
export default Task