import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
import userModel from '../models/userModel.js'

//controller fun to remove backgraound image
const removeBgImage=async(req,res)=>{
 try{
   const {clerkId}=req.body;
   const user=await userModel.findOne({clerkId})
   if(!user){
    res.json({success:false,message:"User Not Found"})
   }
   if(user.creditBalance===0){
    return res.json({success:false,message:"No Credit!!Buy the credits",creditBalance:user.creditBalance})
   }
   const imagePath=req.file.path;
   //reading the image file 
   const imageFile=fs.createReadStream(imagePath)
   const formData=new FormData()
   formData.append('image_file',imageFile)
   const {data}=await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{
    headers:{
        'x-api-key':process.env.CLIPDROP_API
    },
    responseType:'arraybuffer'
   })
   const base64Image=Buffer.from(data,'binary').toString('base64')
   const resultImage=`data:${req.file.mimetype};base64,${base64Image}`
   await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})
   res.json({success:true,resultImage,creditBalance:user.creditBalance-1,message:'Background Removed'}) 
}
 catch(err){
    console.log(err)
    res.json({success:false,message:err.message})
 }
}
export {removeBgImage}