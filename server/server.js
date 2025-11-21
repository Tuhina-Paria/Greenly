import express from 'express'
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './configs/db.js';
import 'dotenv/config';


const app=express();
const port =process.env.PORT || 4000;

await connectDB()


// allow multiple origins
const allowedOrigin = "http://localhost:5173"; // your frontend URL


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));




// test route
app.get('/',(req,res)=>res.send('API is working'));

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));