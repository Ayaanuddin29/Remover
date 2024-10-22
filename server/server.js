import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
//app config
const PORT=process.env.PORT||4000
const app=express()
await connectDB()
//initialize Middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("API WORKING")
})
app.listen(PORT,()=>{
 console.log('Server Running on Port'+PORT)
})