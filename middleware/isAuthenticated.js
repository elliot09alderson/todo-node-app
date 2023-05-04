
import { userModel } from "../models/userModel.js";
import jwt  from "jsonwebtoken";
export const isAuthenticated =async(req,res,next)=>{
try {
    
    const {token} = req.cookies;
    
    
    if(!token)return res.status(404).json({
        success:false,
        message:"Login first"
    })
    
    const userObj =  jwt.verify(token,process.env.JWT_SECRET);
    req.user = await userModel.findById(userObj._id);
    next();
} catch (error) {
 next(error)   
}
}