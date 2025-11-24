import mongoose from "mongoose";

const addressSchema= new mongoose.Schema({
userId:{type:String,required:true},
fullName:{type:String,required:true},
email:{type:String,required:true},
street:{type:String,required:true},
city:{type:String,required:true},
state:{type:String,required:true},
pincode:{type:Number,required:true},
country:{type:String,required:true},
phone:{type:Number,required:true},

})

const Address=mongoose.models.address ||mongoose.model('address',addressSchema)

export default Address;