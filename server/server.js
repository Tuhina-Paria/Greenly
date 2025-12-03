import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

// ----------------------
// CONNECT DATABASE & CLOUDINARY
// ----------------------
await connectDB();
await connectCloudinary();

// ----------------------
// ALLOWED DOMAINS
// ----------------------
const allowedOrigin = [
  "http://localhost:5173",
  "https://greenly-fronted.vercel.app",   // YOUR FRONTEND
];

// ----------------------
// IMPORTANT: STRIPE WEBHOOK (RAW BODY)
// ----------------------
app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// ----------------------
// CORS MUST BE FIRST (BEFORE express.json)
// ----------------------
app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // allow cookies
  })
);

// ----------------------
// ESSENTIAL MIDDLEWARES
// ----------------------
app.use(cookieParser());

// body parser AFTER STRIPE
app.use(express.json());

// ----------------------
// TEST ROUTE
// ----------------------
app.get("/", (req, res) => res.send("API is working fine!"));

// ----------------------
// ROUTES
// ----------------------
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// ----------------------
// SERVER
// ----------------------
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
