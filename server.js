import express from 'express';
require("dotenv").config();
import cors from 'cors';
import initRoutes from './src/routes';
import connectDatabase from './src/config/connectDatabase';

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['POST','PUT','GET','DELETE']
}));

app.use(express.json());
app.use(express.urlencoded(
    {
        extended:true
    }
))

initRoutes(app)
connectDatabase();

const port = process.env.PORT || 8866;
const listener = app.listen(port,()=>{
    console.log(`Server is running on port ${listener.address().port}`);
})