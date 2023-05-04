
import { taskModel } from "../models/taskModel.js"
import ErrorHandler from "../utils/ErrorHandler.js"

export const createTask=async(req,res)=>{
    const {title,desc} = req.body
    const task = await taskModel.create({title,desc,user:req.user})
    res.status(201).json({
        success:true,
        task:task,
        message:"Task added Successfully"
    })
}

export const getMyTask= async(req,res,next)=>{
    const {_id} = req.user
    const task = await taskModel.find({user:_id});
    if(!task) return next(new ErrorHandler("task not found",404))

    res.status(200).json({
        success:true,
        tasks:task
    })
}


export const deleteTask = async(req,res,next)=>{
    const {id} = req.params
    const task = await taskModel.findById(id)
    if(!task) return next(new ErrorHandler("task not found",404))
    await task.deleteOne()
     res.status(200).json({
        success:true,
        message:"task deleted"
    })
}



export const editTask = async(req,res,next)=>{
    try {
        
        const {id} = req.params
        const task = await taskModel.findById(id)
        if(!task) return next(new ErrorHandler("invalid request ",401))
        task.isCompleted = !task.isCompleted;
        await task.save()
        res.status(200).json({
            success:true,
            message:"task updated"
        })
    } catch (error) {
     next(error)   
    }
}