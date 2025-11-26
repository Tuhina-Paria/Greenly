import express from 'express';
import authUser from '../middlewares/authUser.js';
import User from '../models/User.js';
 

// Update Cart Data : /api/cart/update
export const updateCart = async (req, res) => {
  try {
     const userId = req.userId;    
    const {  cartItems } = req.body;

    await User.findByIdAndUpdate(userId, { cartItems });

    return res.json({
      success: true,
      message: "Cart Updated",
    });
    
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
