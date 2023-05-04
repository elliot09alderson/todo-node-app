import mongoose from "mongoose";

 const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    desc:{
        type:String,
        required:true,
    },
isCompleted:{
    type:Boolean,
    default:false,
},
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    createdAt:{
        type:Date,
            default:Date.now}
    
})
export const taskModel = mongoose.model("task",taskSchema)