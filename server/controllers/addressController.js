import Address from "../models/Address.js"
import authUser from '../middlewares/authUser.js';
import User from '../models/User.js';
 


//Add Address :/api/address/add
export const addAddress=async(req,res)=>{
    try {
      const userId = req.userId;  
        const {address}=req.body;

        await Address.create({...address,userId})
        res.json({success:true,message:"Address added successfully"});
    } catch (error) {
        console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
    }
}

// Get Address ://api/address/get
export const getAddress=async(req,res)=>{
   try {
        const userId = req.userId;
 const addresses=await Address.find({userId})
     res.json({success:true,addresses});
   } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: error.message,
    });
   }
}

// Delete Address :/api/address/delete/:id
export const deleteAddress = async (req, res) => {
  try {
    const addressId = req.params.id;
    const userId = req.userId;

    // Delete only if address belongs to user
    const deleted = await Address.findOneAndDelete({
      _id: addressId,
      userId: userId
    });

    if (!deleted) {
      return res.json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address deleted successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



// Update Address : /api/address/update
export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { addressId, street, city, state, country, pincode } = req.body;

    if (!addressId) {
      return res.json({ success: false, message: "Address ID is required" });
    }

    // Update only if the address belongs to the logged-in user
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, userId },
      { street, city, state, country, pincode },
      { new: true }
    );

    if (!updatedAddress) {
      return res.json({ success: false, message: "Address not found or unauthorized" });
    }

    return res.json({ success: true, message: "Address updated", address: updatedAddress });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};