//import required packages and modules
import express, {Router} from 'express'; //express framework for server setup
import "dotenv/config"; //load environment variables from .env
import mongoose from 'mongoose'; // ODM to interact with MongoDB
import cors from 'cors'; //middleware to enable cross-origin resource sharing

//import route hanlders
import authRoutes from './routes/authRoutes.js'; //routes for user authentication(login, register)
import taskRoutes from './routes/taskRoutes.js'; //routes for handling quests/tasks


const PORT = process.env.PORT; //load port from environment variables (defined in .env)


const app = express(); // create an express application


app.use(cors({ // enable cors for local frontend running on port 5173
    origin: 'http://localhost:5173', //allow front to connect
    credentials: true //allow cookies/headers like authorization
}));

app.use(express.json()); //enable express to parse incoming json request bodies

//set up routes for API endpoints
app.use('/api/auth', authRoutes); //all routes handled by authRoutes (/api/auth)
app.use('/api/tasks', taskRoutes); //all routes handled by taskRoutes (/api/tasks)

app.get('/', (req, res)=> { //basic test route to confirm server is working
    res.send('The Chill Quest'); //message shown at root URL
});

//start the server and connect to MongoDB
const startServer = async () =>{
try{ //attempt to connect to MongoDB using MONGO_URL from .env
await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT} `)); //start express server on specified port
    
} catch (error) {
    console.error('MongoDB connection error:', error) //if MongoDB connection fails. log the server
}
};

startServer(); // invoke function to start server