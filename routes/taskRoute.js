import express from 'express'
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { deleteTask, editTask,createTask,getMyTask } from '../controllers/taskController.js'

export const taskRouter  = express.Router()

taskRouter.post('/new',isAuthenticated,createTask) 
taskRouter.get('/my',isAuthenticated,getMyTask) 
taskRouter.route("/:id").put(isAuthenticated,editTask).delete(isAuthenticated,deleteTask)
