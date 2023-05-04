
import { userModel } from "../models/userModel.js"
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendCookie } from "../utils/sendCookie.js";

export const getAllUsers=async(req,res)=>{
    try {
        
        const user  = await userModel.find({});
        res.status(200).json({
            success:"true",
            users : user
        })
    } catch (error) {
    next(error)    
    }
}

export const registerUser=async(req,res)=>{
    try {
        
        const {name,email,password} = req.body
        const userFound = await userModel.findOne({email}).select("+password");
        if(userFound) return res.status(404).json({
            success:false,
            message:"User already exist"
        })
        
        
        const encPassword  = await bcrypt.hash(password,10)
        let user =await userModel.create({name,email,password:encPassword})
        
        
        //jwt works
        const encToken = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        
        res.cookie("token",encToken,{ httpOnly:true,maxAge:15*60*1000})
        // console.log(user.name)
        res.send("user created successfully...")
    } catch (error) {
     next(error)   
    }
    }
    // ------------------------------XXX-----------------------------------------
    
    
    export const loginUser=async(req,res)=>{
try {
    
    const {email,password} = req.body;
    const user = await userModel.findOne({email}).select("+password");
    const isMatch = await bcrypt.compare(password,isFound.password)
    if(!isMatch) return next(new ErrorHandler("Invalid user id or password",404))
    sendCookie(user,res,`Welcome back, ${user.name}`,200)
} catch (error) {
 next(error)   
}
}


export const logoutUser=(req,res)=>{
res.status(200).cookie("token","",{expires:new Date(Date.now()) ,sameSite:process.env.NODE_ENV=="Development" ? "lax":"none",secure:process.env.NODE_ENV=="Development"?false:true}).json({
    success:true,
    message:"user logged out successfully"
})
}

export const deleteUser=async(req,res)=>{
   
   try {
    
       const {id} = req.params
       const user = await userModel.findById(id)
       if(!user) return next(new ErrorHandler("user not found",404))
       await user.remove()
       res.status(200).json({
           success:"true",
           user : user,
           message:"deleted"
        })
    } catch (error) {
 next(error)    
    }
}

// export const updateUser=async(req,res)=>{
//     const {id} = req.params
//     const user = await userModel.findById(id)
//     if(!user) return next(new ErrorHandler("user not found",404))

//     res.status(200).json({
//         success:"true",
//         user : user,
//         message:"updated"
//     })
// }

export const getMyProfile=(req,res)=>{
    const {id} = req.params

    if(!user) return next(new ErrorHandler("user not found",404))

const user = userModel.findById(id)
    res.status(200).json({
        success:"true",
        user : req.user
    })
}