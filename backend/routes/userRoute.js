import express from "express";
import {getProfile, loginUser, registerUser, updateProfile, bookAppointment, listAppointment} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", authUser, upload.single("image"), updateProfile);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, listAppointment);

export default userRouter;