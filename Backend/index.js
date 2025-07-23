

import express, {Router} from 'express';
import "dotenv/config";
import mongoose from 'mongoose';
import cors from 'cors';


import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';


const PORT = process.env.PORT;


const app = express();


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res)=>{
    res.send('The Chill Quest');
});

const startServer = async () =>{
try{
await mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on ${PORT} `));
    
} catch (error) {
    console.error('MongoDB connection error:', error)
}
};

startServer();