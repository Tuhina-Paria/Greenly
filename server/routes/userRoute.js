import express from "express";
import { isAuth, login, logout, register, updateProfile } from "../controllers/userControllers.js";
import authUser from "../middlewares/authUser.js";


const userRouter = express.Router();
userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/is-auth",authUser,isAuth);
userRouter.post("/logout",authUser,logout);
userRouter.put("/update-profile", authUser, updateProfile);




export default userRouter;