import { useEffect } from "react"
import ResumeUploader from "./ResumeUploader"

const ResumeAnalyser=({text})=>{
console.log("resume analyzer")    
console.log({text})

   useEffect(()=>{
    const getResumeWorth = async(text) =>{
        const messageToSend =`RESUME:`
    }



   },[])
    return(
    <div>
      
          <p>{text}</p>
          
      
    </div>
    )
}
export default ResumeAnalyser
//show uploader screen