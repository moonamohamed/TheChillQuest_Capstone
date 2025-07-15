

import express, {Router} from 'express';
import "dotenv/config";
import mongoose from 'mongoose';


const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.get('/', (req, res)=>{
    res.send("Moon");
})

app.listen(3000, ()=>{
    console.log(`listening on port: ${PORT}`)
});

await mongoose.connect('MONGO_URL= mongodb+srv://munamohamed2890:dudewheresmycode@mooncluster0.ouav8ua.mongodb.net/?retryWrites=true&w=majority&TheChillQuest=Mooncluster0')
.then(()=>{
    console.log(`Connected to database`)
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${ PORT}`)
    });
}).catch(()=>{
    console.log(`connection failed`)
});