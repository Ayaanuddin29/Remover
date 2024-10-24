import { useAuth } from "@clerk/clerk-react";
import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
export const AppContext=createContext()

const AppContextProvider=(props)=>{
    const [credit,setCredit]=useState(false);
    const backendURL=import.meta.env.VITE_BACKEND_URL;
    const {getToken}=useAuth()
    const loadCreditsData=async()=>{
        try{
          const token=await getToken()
          const {data}=await axios.get(backendURL+'/api/user/credits',{headers:{token}})
          if(data.success){
            setCredit(data.credits)
            console.log(data.credits)
          }
        }
        catch(err){
          console.log(err)
          toast.error(err.message)
        }
    }
    const value={
       loadCreditsData,credit,setCredit,backendURL
    }
    return (
        <AppContext.Provider value={value}>
        {props.children}
        </AppContext.Provider>

    )
}
export default AppContextProvider