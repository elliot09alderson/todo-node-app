import express from 'express'
import { deleteUser, getAllUsers, getMyProfile, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

export const UserRouter =  express.Router()
 UserRouter.get('/all',isAuthenticated, getAllUsers)
 UserRouter.post('/register',registerUser)
 UserRouter.post('/login',loginUser)
 UserRouter.get('/logout',logoutUser)
 UserRouter.get('/delete',deleteUser)
UserRouter.get('/me',isAuthenticated,getMyProfile)
//  UserRouter.get('/:id',isAuthenticatedUser,getMyProfile).delete(deleteUser).put(updateUser)


    