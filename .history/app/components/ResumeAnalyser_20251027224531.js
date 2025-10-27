import { useEffect } from "react"
import ResumeUploader from "./ResumeUploader"
import { useCompletion } from "@ai/react"

const ResumeAnalyser=({text})=>{

    const { completion, isLoading, complete, error } = useCompletion
    

   useEffect(()=>{
    const getResumeWorth = async(text) =>{
        const messageToSend =`RESUME:${text}\n\n-----------\n\n`
        await compl
    
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