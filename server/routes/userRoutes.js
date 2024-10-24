import express from 'express'
import { clerkWeebhooks, userCredits } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'
const userRouter=express.Router()
userRouter.post('/webhooks',clerkWeebhooks)
userRouter.get('/credits',authUser,userCredits)
export default userRouter