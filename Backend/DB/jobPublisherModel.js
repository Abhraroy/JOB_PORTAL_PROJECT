import mongoose from "mongoose";

const schema = mongoose.Schema
const objectId = mongoose.Types.ObjectId


const orgSchema = new schema({
    org_id:{
        type:String,
        required:true
    },
    companyName: {
        type:String,
        required:true
    },
    companyEmail: {
        type:String,
        required:true
    },
    companyPhone: {
        type:String,
        required:true
    },
    companyWebsite: {
        type:String,
        required:true
    },
    companyAddress: {
        type:String,
        required:true
    },
    companyCity: {
        type:String,
        required:true
    },
    companyState: {
        type:String,
        required:true
    },
    companyCountry: {
        type:String,
        required:true
    },
    companyDescription: {
        type:String,
        required:true
    },
})


export const orgModel = mongoose.model("orgDetails",orgSchema)