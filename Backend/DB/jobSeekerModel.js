import mongoose from "mongoose";

const schema = mongoose.Schema
// const objectId = mongoose.Types.ObjectId

const userSchema = new schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const profileSchema = new schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    Age:{
        type:Number,
        required:true
    },
    // education: [
    //     // {
    //     //   institution: { type: String, required: true },
    //     //   degree: { type: String, required: true },
    //     //   fieldOfStudy: { type: String },
    //     //   startYear: { type: Number },
    //     //   endYear: { type: Number },
    //     //   grade: { type: String },
    //     //   description: { type: String }
    //     // }
    // ],
    education:{
        type:String,
        required:true
    },
    // experience: [
    //     {
    //         company: { type: String, required: true },
    //     }
    // ],
    experience:{
        type:String,
        required:true
    },
    // skills:[
    //     {
    //         skill:{
    //             type:String
    //         }
    //     }
    // ],
    skills:{
        type:String,
        required:true
    },
    // social_links:[
    //     {
    //         platform:{
    //             type:String
    //         },
    //         link:{
    //             type:String
    //         }
    //     }
    // ]
    social_links:{
        type:String,
        required:true
    }
})







export const userModel = mongoose.model("user",userSchema)
export const profileModel = mongoose.model("userProfile",profileSchema)








