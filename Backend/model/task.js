import mongoose from "mongoose"; //import the mongoose library to define schema and models

const taskSchema = mongoose.Schema( //define the schema for a task (quest)
    {
        text: {type: String}, //text of the quest
        completed: {type: Boolean, default: false}, //whether the task has been completed (defalt is false)
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true} //reference to the user who wants this task
    }
);

const Task = mongoose.model('Task', taskSchema) //export the model so it can it be used in routes
export default Task