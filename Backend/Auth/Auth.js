import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;



export const AuthUser = async(req,res,next)=>{
    const auth_token = req.headers.authorization
    if(!auth_token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token = auth_token.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,jwtSecret)
        req.user_id = decoded.user_id
        next()
    }catch(error){
        console.log(error)
        return res.status(401).json({message:"Unauthorized"})
    }
}


export const AuthOrg = async(req,res,next)=>{
    const auth_token = req.headers.authorization
    if(!auth_token){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token = auth_token.split(" ")[1]
    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try{
        const decoded = jwt.verify(token,jwtSecret)
        req.user_id = decoded.user_id
        next()
    }catch(error){
        console.log(error)
        return res.status(401).json({message:"Unauthorized"})
    }
}