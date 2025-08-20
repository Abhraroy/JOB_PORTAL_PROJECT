import express from "express";
import dotenv from "dotenv";
import cors from "cors";




import {DB_connection} from "./utility/DB_connect.js";
import jobSeekerRoutes from "./Routes/jobSeekerRoutes/route.js";
import jobPublisherRoutes from "./Routes/JobPublisherRoutes/route.js";

dotenv.config();


const app = express();

app.use(cors(
    {
        credentials:true,
         origin:"https://job-portal-project-sable.vercel.app" 
      

        

        
    }
))

app.use(express.urlencoded({extended:true}))

try{
    DB_connection();
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`)
    })
}catch(error){
    console.log(error)
}


app.use("/api/v1/publishJob",jobPublisherRoutes)
app.use(express.json())
app.use("/api/v1/findJob",jobSeekerRoutes)

// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })

