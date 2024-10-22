import mongoose from 'mongoose'

const connectDB=async(req,res)=>{
    mongoose.connection.on('connected',()=>{
        console.log('database connected')
    })
    await mongoose.connect(`${process.env.MONGO_URI}`)
}
export default connectDB;