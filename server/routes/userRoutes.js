import express from 'express'
import { clerkWeebhooks, paymentRazorpay, userCredits, verifyRazorpay } from '../controllers/UserController.js'
import authUser from '../middlewares/auth.js'
const userRouter=express.Router()
userRouter.post('/webhooks',clerkWeebhooks)
userRouter.get('/credits',authUser,userCredits)
userRouter.post('/payment',authUser,paymentRazorpay)
userRouter.post('/verify-razor',verifyRazorpay)
export default userRouter