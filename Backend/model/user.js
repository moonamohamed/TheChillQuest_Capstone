import mongoose from "mongoose"; // import the mongoose library for schema and model creation

const userSchema = new mongoose.Schema({ // define the schema for the user collection
    username: { //unique username of the user
        type: String,
        required: true,
        unique: true
    },
    password: { //hashed password for login authentication
        type: String,
        required: true
    },
    xp: { //the total XP the user has earned
        type: Number,
        default: 0
    },
    level: { //the user's current level
        type: Number,
        default: 1
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);