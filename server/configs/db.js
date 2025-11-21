import mongoose from "mongoose";



const connectDB=async()=>{
    try {
        mongoose.connection.on('connected',()=>console.log("Database is Connected"));
        await mongoose.connect(`${process.env.MONGODB_URI}/greenly`)
    } catch (error) {
        console.error(error.message);
    }
}
export default connectDB;