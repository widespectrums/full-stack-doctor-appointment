import express from "express";
import {
    addDoctor, adminDashboard,
    allDoctors,
    appointmentCancel,
    appointmentsAdmin,
    loginAdmin
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import {changeAvailability} from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin)
adminRouter.post("/add-doctor", authAdmin, upload.single('image'), addDoctor)
adminRouter.get("/all-doctors", authAdmin, allDoctors)
adminRouter.post("/change-availability", authAdmin, changeAvailability)
adminRouter.post("/cancel-appointment", authAdmin, appointmentCancel)
adminRouter.get("/dashboard", authAdmin, adminDashboard)
adminRouter.get("/appointments", authAdmin, appointmentsAdmin)

export default adminRouter;