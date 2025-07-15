

import express, {Router} from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors;'


import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const PORT = process.env.PORT;

Dotenv.config();
const app = express();


app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Moon");
});



await mongoose.connect('MONGO_URL= mongodb+srv://munamohamed2890:dudewheresmycode@mooncluster0.ouav8ua.mongodb.net/?retryWrites=true&w=majority&TheChillQuest=Mooncluster0')
.then(()=>{
    console.log(`Connected to database`)
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is running on port: ${ process.env.PORT}`)
    });
}).catch((error)=>
    console.error(error));