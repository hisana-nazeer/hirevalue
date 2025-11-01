import { useEffect, useState } from "react"
import ResumeUploader from "./ResumeUploader"
import { useCompletion } from "";


const ResumeAnalyser=({text})=>{
    console.log("ai modeule imported fine")

    const { completion, isLoading, complete, error } = useCompletion
    const [resumeText, setResumeText] = useState("")

    const getResumeWorth = async(text) =>{
        const messageToSend =`RESUME:${text}\n\n-----------\n\n`
        await complete(messageToSend)
    
    }

    if(text!==""){}



   

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

