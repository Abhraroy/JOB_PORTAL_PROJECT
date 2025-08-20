import { Router } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { hashPassword } from "../../utility/hashPassword.js";
import { orgModel } from "../../DB/jobPublisherModel.js";
import { jobModel } from "../../DB/jobModel.js";
import redisClient from "../../utility/redis_client.js";
import bodyParser from "body-parser";
import { Webhook } from "svix";
import express from "express";
import { requireAuth } from '@clerk/express';
import mongoose from "mongoose";
import { userModel,profileModel } from "../../DB/jobSeekerModel.js";
const router = Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
dotenv.config()


const clerk_webhook_secret = process.env.CLERK_WEBHOOK_SECRET








router.post(
  "/clerk/webhook",
  bodyParser.raw({ type: "application/json" }), // Keep raw body
  (req, res) => {
    console.log("📩 hitting the route");

    const wh = new Webhook(clerk_webhook_secret);

    let evt;
    try {
      evt = wh.verify(req.body, req.headers); // req.body is Buffer here
      console.log("✅ Verified webhook:", evt);

      // Convert data to JSON after evt gets printed

      const payload = JSON.parse(req.body.toString("utf8"));
     const org_id = payload.data.id
      res.status(200).json({ message: "Webhook received" });
    } catch (error) {
      console.error("❌ Webhook verification failed", error.message);
      res.status(400).json({ message: "Webhook verification failed" });
    }
  }
);





















router.use(express.json())

router.get("/orgProfile",requireAuth({
}),async(req,res)=>{
    
    console.log("Full req.auth object:", req.auth.isAuthenticated);
    const isAuthenticated =  req.auth.isAuthenticated
    const org_id =  req.auth.userId
    console.log(org_id)
    if(!org_id){
        return res.status(401).json({message:"Unauthorized"})
    }
    const org = await orgModel.findOne({org_id})
    console.log("org",org)
    if(org){
        return res.status(200).json({message:"Company found",org})
    }
    return res.status(404).json({message:"Company not found"})
})

router.post("/createorgProfile",requireAuth(
),async(req,res)=>{
  console.log("Full req.auth object:", req.auth.isAuthenticated);
  const isAuthenticated = req.auth.isAuthenticated
  const org_id = req.auth.userId
  console.log(org_id)
  if(!org_id){
      return res.status(401).json({message:"Unauthorized"})
  }
  const org = await orgModel.findOne({org_id})
  if(org){
      return res.status(200).json({message:"Company found"})
  }
  const {companyName,companyEmail,companyPhone,companyWebsite,companyAddress,companyCity,companyState,companyCountry,companyDescription} = req.body

  const createOrg = await orgModel.create({
      org_id,
      companyName,
      companyEmail,
      companyPhone,
      companyWebsite,
      companyAddress,
      companyCity,
      companyState,
      companyCountry,
      companyDescription
  })
  return res.status(200).json({message:"Company created successfully",createOrg})
})


router.put("/updateOrgProfile",requireAuth(
  
),async(req,res)=>{
  console.log("Hitting the update route")
  const{companyName,companyEmail,companyPhone,companyWebsite,companyAddress,companyCity,companyState,companyCountry,companyDescription} = req.body
  const isAuthenticated = req.auth.isAuthenticated
  const org_id = req.auth.userId
  if(!org_id){
    return res.status(401).json({message:"Unauthorized"})
  }
  const org = await orgModel.findOne({org_id})
  if(!org){
    return res.status(404).json({message:"Company not found"})
  }
  const updatedOrg = await orgModel.findByIdAndUpdate(org._id,{companyName,companyEmail,companyPhone,companyWebsite,companyAddress,companyCity,companyState,companyCountry,companyDescription},{new:true})
  return res.status(200).json({message:"Company updated successfully",updatedOrg})
})


















router.post("/postJob",requireAuth(
),async(req,res)=>{
    const{title,description,lastDate,address,jobCategory,jobType,jobLocation,experienceLevel,skillsRequired,salaryRange,openings,status} = req.body
    console.log(req.body)
    const isAuthenticated = req.auth.isAuthenticated
    console.log(isAuthenticated)
    const org_id = req.auth.userId
    console.log(org_id)
    if(!org_id){
        return res.status(401).json({message:"Unauthorized"})
    }

    const org = await orgModel.findOne({org_id})
    if(!org){
        return res.status(404).json({message:"Company not found"})
    }
    const job = await jobModel.create({
        title,
        description,
        lastDate,
        address,
        jobCategory,
        jobType,
        jobLocation,
        experienceLevel,
        skillsRequired,
        salaryRange,
        openings,
        status,
        company:org._id
    })
    return res.status(200).json({message:"Job posted successfully",job})
})



router.get("/getJobs",requireAuth(),async(req,res)=>{
  const isAuthenticated = req.auth.isAuthenticated
  const org_id = req.auth.userId
  console.log(org_id)
  if(!org_id){
    return res.status(401).json({message:"Unauthorized"})
  } 
  const org = await orgModel.findOne({org_id})
  if(!org){
    return res.status(404).json({message:"Company not found"})
  }
  const jobs = await jobModel.find({company:org._id})
  console.log(jobs)
  return res.status(200).json({message:"Jobs fetched successfully",jobs})
})



router.get("/viewApplicants/:jobId",requireAuth(
  
),async(req,res)=>{
  const isAuthenticated = req.auth.isAuthenticated
  const org_id = req.auth.userId
  const {jobId} = req.params
  const jobID = new mongoose.Types.ObjectId(jobId)
  console.log(org_id)
  if(!org_id){
    return res.status(401).json({message:"Unauthorized"})
  } 
  const org = await orgModel.findOne({org_id})
  if(!org){
    return res.status(404).json({message:"Company not found"})
  }
  const jobs1 = await jobModel.findById(jobID)
  console.log("jobs1",jobs1)
  
  // Debug: Check what user_ids are in applicants
  console.log("Applicant user_ids:", jobs1.applicants.map(app => app.user_id))
  
  // Debug: Check what profiles exist with these user_ids
  const applicantUserIds = jobs1.applicants.map(app => app.user_id)
  const existingProfiles = await profileModel.find({ user_id: { $in: applicantUserIds } })
  console.log("Existing profiles with these user_ids:", existingProfiles)
  console.log("Profile user_ids:", existingProfiles.map(p => p.user_id))
  
  const applicants = await profileModel.find(jobs1.applicants.user_id)
  console.log("applicants",applicants)
  
  // Use aggregation to properly join the data
  const jobs = await jobModel.aggregate([
    { $match: { _id: jobID } },
    {
      $lookup: {
        from: "userprofiles", // Collection name (lowercase)
        localField: "applicants.user_id",
        foreignField: "user_id",
        as: "applicantProfiles"
      }
    },
    {
      $addFields: {
        applicants: {
          $map: {
            input: "$applicants",
            as: "applicant",
            in: {
              $mergeObjects: [
                "$$applicant",
                {
                  profile: {
                    $arrayElemAt: [
                      {
                        $filter: {
                          input: "$applicantProfiles",
                          cond: { $eq: ["$$this.user_id", "$$applicant.user_id"] }
                        }
                      },
                      0
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    },
    { $project: { applicantProfiles: 0 } }
  ])

  console.log("Aggregated jobs:", jobs)
  return res.status(200).json({message:"Jobs fetched successfully",jobs: jobs[0]?.applicants || []})
})









router.get("/getJobs/:jobId",requireAuth(
 
),async(req,res)=>{
  const isAuthenticated = req.auth.isAuthenticated
  const org_id = req.auth.userId
  const {jobId} = req.params
  const jobID = new mongoose.Types.ObjectId(jobId)
  console.log(org_id)
  if(!org_id){
    return res.status(401).json({message:"Unauthorized"})
  } 
  const org = await orgModel.findOne({org_id})
  if(!org){
    return res.status(404).json({message:"Company not found"})
  }
  const jobs = await jobModel.findById(jobID)
  console.log(jobs)
  return res.status(200).json({message:"Jobs fetched successfully",jobs})
})

router.put("/updateJob/:jobId",requireAuth(
 
),async(req,res)=>{
  const{title,description,lastDate,address,jobCategory,jobType,jobLocation,experienceLevel,skillsRequired,salaryRange,openings,status} = req.body
  const isAuthenticated = req.auth.isAuthenticated
  console.log(isAuthenticated)
  const org_id = req.auth.userId
  console.log(org_id)
  if(!org_id){
      return res.status(401).json({message:"Unauthorized"})
  }

  const org = await orgModel.findOne({org_id})
  if(!org){
      return res.status(404).json({message:"Company not found"})
  }
  
  const {jobId} = req.params
  const jobID = new mongoose.Types.ObjectId(jobId)

  // First check if the job exists and belongs to this organization
  const existingJob = await jobModel.findById(jobID)
  if(!existingJob){
      return res.status(404).json({message:"Job not found"})
  }
  
  // Verify the job belongs to this organization
  if(existingJob.company.toString() !== org._id.toString()){
      return res.status(403).json({message:"You can only update jobs from your organization"})
  }

  // Update the job
  const updatedJob = await jobModel.findByIdAndUpdate(
      jobID,
      {
          title,
          description,
          lastDate,
          address,
          jobCategory,
          jobType,
          jobLocation,
          experienceLevel,
          skillsRequired,
          salaryRange,
          openings,
          status,
          updatedAt: new Date()
      },
      {new: true}
  )
  
  return res.status(200).json({message:"Job updated successfully",job: updatedJob})
})














export default router