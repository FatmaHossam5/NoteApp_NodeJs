import userModel from "../../../DB/model/User.js";
import { asyncHandler } from "../../../services/errorHandling.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signUp=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body;
    const user= await userModel.findOne({email}).select('email')
    if(user){
        return  res.status(409).json({message:"Email Exist"})
    }else{
const hash = bcrypt.hashSync(password,parseInt(process.env.SALTROUND))
const newUser=await userModel({name,email,password:hash})
const savedUser= await newUser.save()
    return  res.status(201).json({message:"Done",savedUser:savedUser._id})

    }
} 

)

export const login=asyncHandler(async(req,res,next)=>{
        
    const {email,password}=req.body;
    const user= await userModel.findOne({email})
    if(!user){
        return   res.status(400).json({message:"Email Not exist"})
        
    }else{
    
        const match = bcrypt.compareSync(password,user.password)
        if(!match){
            return    res.status(400).json({message:"In-valid Password"})
            
    
        }else{
            const token= jwt.sign({id:user._id},process.env.signature)
            return  res.status(200).json({message:"Done",token})  }
       }}
      
       



    


)