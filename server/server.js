import express from 'express'
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';


const app=express();
const port =process.env.PORT || 4000;

await connectDB()
await connectCloudinary()

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
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);




app.listen(port, () => console.log(`Server running on http://localhost:${port}`));