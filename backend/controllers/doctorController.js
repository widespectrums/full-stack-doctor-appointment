import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import error from "multer/lib/multer-error.js";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availability Changed"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(["-password", "-email"])
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
const loginDoctor = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await doctorModel.findOne({email})
        if (!user) {
            return res.json({success: false, message: error.message})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: error.message})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//API to get doc appointments for doc panel
const appointmentsDoctor = async (req, res) => {
    try {
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        res.json({success: true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//API to mark app comleted for doc panel
const appointmentComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: "Appointment Completed"})

        }else {
            return res.json({success: false, message: "Mark Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
//API to mark app completed for doc panel
const appointmentCancel = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: "Appointment Cancelled"})
        }else {
            return res.json({success: false, message: "Cancellation Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}
const doctorDashboard = async (req, res) => {
    try{
        const {docId} = req.body
        const appointments = await appointmentModel.find({docId})
        let earnings = 0
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })
        let patients = []

        appointments.map((item)=>{
            if(patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({success: true, dashData})
    }catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export {changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard}