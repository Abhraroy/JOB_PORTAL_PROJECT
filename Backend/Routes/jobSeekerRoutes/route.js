import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import { userModel,profileModel } from "../../DB/jobSeekerModel.js";
import { hashPassword } from "../../utility/hashPassword.js";
import { AuthUser } from "../../Auth/Auth.js";
import { jobModel } from "../../DB/jobModel.js";
import cloudinary from "../../utility/cloudinaryConfig.js";
import { upload } from "../../utility/multer.js";




const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const jwtSecret = process.env.JWT_SECRET;
// const saltRound = process.env.SALT_ROUND;

const router = Router();



//registration of a user
router.post("/auth/register",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }
    if(!emailPattern.test(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid email"
        })
    }
    const isuser  = await userModel.findOne({email})
    if(isuser){
        res.status(409).json({message:"User already exists,try to login"})
    }
    if(password.length < 8){
        return res.status(400).json({message:"Password must be at least 8 characters long"})
    }
    const hashedPassword = await hashPassword(password)

    const user = await userModel.create({
        email:email,
        password:hashedPassword
    })
    if(!user){
        res.status(500).json({message:"Something went wrong"})
    }
    const token = jwt.sign(
        {
            user_id:user._id
        },jwtSecret,{expiresIn:"36h"}
    )
    return res.status(201).json({
        success:true,
        message:"User created successfully",
        token:token
    })
})




//login of a user
router.post("/auth/login",async(req,res)=>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Email and password are required"
        })
    }
    if(!emailPattern.test(email)){
        return res.status(400).json({
            success:false,
            message:"Invalid email"
        })
    }
    const isuser  = await userModel.findOne({email})
    if(!isuser){
        res.status(401).json({message:"User doesnot exists,try to register"})
    }
    if(password.length < 8){
        return res.status(400).json({message:"Password must be at least 8 characters long"})
    }
    const isPasswordCorrect = await bcrypt.compare(password,isuser.password)
    if(!isPasswordCorrect){
        return res.status(401).json({message:"Invalid password"})
    }
    const token = jwt.sign({
        user_id:isuser._id
    },jwtSecret,{expiresIn:"36h"})

    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        token:token
    })
})










//get the profile of the user
router.get("/user/profile",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    console.log(user_id)
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    const profile = await profileModel.findOne({user_id})

    return res.status(200).json({profile})
})










//create the profile of the user
router.post("/user/profile",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    const {name,email,phone,address,city,state,country,Age,education,experience,skills,social_links} = req.body
    if(!name||!email||!phone||!address||!city||!state||!country||!Age){
        return res.status(422).json({message:"All fields are required"})
    }
    const profile = await profileModel.create({
        user_id:user_id,
        name:name,
        email:email,
        phone:phone,
        address:address,
        city:city,
        state:state,
        country:country,
        Age:Age,
        education:education,
        experience:experience,
        skills:skills,
        social_links:social_links
    })
    if(!profile){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(201).json({message:"Profile created successfully"})
})


//route to get all the jobs
router.get("/jobs",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
     const Alljob = await jobModel.find({}).sort({createdAt:-1}).limit(1000).populate({path:"company",model:"orgDetails"})
    // const Alljob = await jobModel.find({}).sort({createdAt:-1}).limit(1000)
    // const Alljob = await jobModel.find({$not:{$elemMatch:{user_id:user_id}}}).sort({createdAt:-1}).limit(1000).populate("company")
    console.log(Alljob)
    if(!Alljob){
        return res.status(404).json({message:"No jobs found"})
    }
    return res.status(200).json({Alljob})
})


router.get("/jobs/:jobId",AuthUser,async(req,res)=>{
    console.log("Hitting the job detail page")
    const user_id = req.user_id
    const {jobId} = req.params
    const JOB_ID = new mongoose.Types.ObjectId(jobId)
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
     const foundJob = await jobModel.findOne({_id:JOB_ID}).populate({path:"company",model:"orgDetails"})
    // const Alljob = await jobModel.find({}).sort({createdAt:-1}).limit(1000)
    // const Alljob = await jobModel.find({$not:{$elemMatch:{user_id:user_id}}}).sort({createdAt:-1}).limit(1000).populate("company")
    console.log("foundJob",foundJob)
    if(!foundJob){
        return res.status(404).json({message:"No jobs found"})
    }
    return res.status(200).json({foundJob})
})


router.get("/myJobs",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    const myJobs = await jobModel.find({applicants:{$elemMatch:{user_id:user_id}}}).populate("company")
    if(!myJobs){
        return res.status(404).json({message:"No jobs found"})
    }
    return res.status(200).json({myJobs})
})













//to get the signature for the resume
router.post("/user/upload/resume",upload.single("resume"),AuthUser,async(req,res)=>{
    const user_id = req.user_id
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    console.log("user_id",user_id)
    const public_id = `job_applicant_resume/${user_id}`
    const uploadResponse = await new Promise((resolve,reject)=>{
        cloudinary.uploader.upload_stream({
            resource_type:"raw",
            public_id:public_id,
            overwrite:true,
            resource_type:"raw"
        },(error,result)=>{
            if(error) reject(error)
            resolve(result)
        }).end(req.file.buffer)
    })
    if(!uploadResponse){
        return res.status(500).json({message:"Something went wrong"})
    }
    const {jobId} = req.body
    if(!jobId){
        return res.status(422).json({message:"invalid job id"})
    }
    const job = await jobModel.findById(jobId)
    if(!job){
        return res.status(404).json({message:"Job not found"})
    }
    console.log("uploadResponse",uploadResponse.secure_url)
    const response = job.applicants.push({
        user_id:new mongoose.Types.ObjectId(user_id),
        resume:uploadResponse.secure_url
    })
    await job.save()
    if(!response){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Job applied successfully"})
})














//route  for uploading the resume
router.post("/jobs/apply/:jobId",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    const resume_link = req.body.resume_link
    const {jobId} = req.params
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    if(!jobId){
        return res.status(422).json({message:"invalid job id"})
    }
    const job = await jobModel.findById(jobId)
    if(!job){
        return res.status(404).json({message:"Job not found"})
    }
    const response = job.applicants.push({
        user_id:user_id,
        resume_link:resume_link
    })
    await job.save()
    if(!response){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Job applied successfully"})

})


//route for getting the jobs applied byt the user
router.get("/myJobs",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    const myJobs = await jobModel.find({applicants:{$elemMatch:{user_id:user_id}}}).populate("company")
    if(!myJobs){
        return res.status(404).json({message:"No jobs found"})
    }
    return res.status(200).json({myJobs})
})





//route for deleting the application
router.delete("/myJobs/:jobId",AuthUser,async(req,res)=>{
    const user_id = req.user_id
    const {jobId} = req.params
    if(!user_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    if(!jobId){
        return res.status(422).json({message:"invalid job id"})
    }
    const job = await jobModel.findById(jobId).populate("company")
    if(!job){
        return res.status(404).json({message:"Job not found"})
    }
    const response = job.applicants.pull({user_id:user_id})
    await job.save()
    if(!response){
        return res.status(500).json({message:"Something went wrong"})
    }
    return res.status(200).json({message:"Application removed successfully"})
    
})







export default router;