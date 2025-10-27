import { useEffect } from "react"
import ResumeUploader from "./ResumeUploader"
import { useCompletion } from "@ai/react"

const ResumeAnalyser=({text})=>{

    const { completion, isLoading, cocomplete } = useCompletion
    

   useEffect(()=>{
    const getResumeWorth = async(text) =>{
        const messageToSend =`RESUME:${text}\n\n-----------\n\n`
        
    
    }



   },[])


    return(
    <div>
      
          <p>{text}</p>
          
      
    </div>
    )
}
export default ResumeAnalyser
//send teh extracted text to api for analysis
//show the screen while waiting for results
//send the results to resumeworth component for display