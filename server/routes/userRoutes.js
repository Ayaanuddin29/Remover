import express from 'express'
import { clerkWeebhooks } from '../controllers/UserController.js'
const userRouter=express.Router()
userRouter.post('/webhooks',clerkWeebhooks)

export default userRouter