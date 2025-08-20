import mongoose from "mongoose";

const schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId

const jobSchema = new schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    lastDate: {
        type:Date,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orgDetails",
    },
    address: {
      type: String,
      required: true
    },
    jobCategory: {
        type:String,
        required:true,
        enum:['IT','HR','Marketing','Sales','Finance','Engineering','Design','Education','Healthcare','Hospitality','Manufacturing','Retail','Transportation','Other']
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Internship', 'Contract'],
    },
    jobLocation: {
      type: String,
      enum: ['Remote', 'On-site', 'Hybrid'],
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level'],
    },
    skillsRequired: [{
      type: String
    }],
    salaryRange: {
      min: Number,
      max: Number
    },
    openings: {
      type: Number,
    },
    status: {
      type: String,
      required:true,
      enum:['Open','Closed']
    },
    applicants: [{
      user_id: {
        type:objectId,
        ref:"userProfile"
      },
      resume:{
        type:String,
      }
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  jobSchema.index({createdAt:-1})


  export const jobModel = mongoose.model("job",jobSchema)