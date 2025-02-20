import express from 'express';
import cors from 'cors';
import "dotenv/config"
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors());

// api endpoints
app.use('/api/admin', adminRouter)
app.use("/api/doctor" , doctorRouter)
app.get('/', (req, res) => {
    res.send("API WORKING")
})

app.listen(port, () => {
    console.log("Server running on port: " + port);
})