import express from 'express';
import authUser from '../middlewares/authUser.js';
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers/addressController.js';

const addressRouter=express.Router();

addressRouter.post('/add',authUser,addAddress);
addressRouter.post('/get',authUser,getAddress);
addressRouter.post("/update", authUser, updateAddress);  
addressRouter.delete("/delete/:id", authUser, deleteAddress);

export default addressRouter;