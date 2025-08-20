import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();



export const DB_connection = async()=>{
    try {
        const db_response = await mongoose.connect(process.env.MONGO_DB_URI+"/Job_Portal")
    } catch (error) {
        console.log(error)
    }
}
