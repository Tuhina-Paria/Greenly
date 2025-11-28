import express from "express";
import authUser from "../middlewares/authUser.js";
import { placeOrderCOD, getUserOrders, getAllOrders, getOrderById } from "../controllers/orderController.js";
import authSeller from "../middlewares/authSeller.js";



const orderRouter = express.Router();

orderRouter.post('/cod',authUser,placeOrderCOD)
orderRouter.get('/user',authUser,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)
orderRouter.get("/:orderId", authUser, getOrderById);

export default orderRouter;