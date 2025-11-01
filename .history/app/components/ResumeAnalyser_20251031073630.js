import { useEffect, useState } from "react"
import ResumeUploader from "./ResumeUploader"
import { useCompletion } from "@ai-sdk/react";


const ResumeAnalyser=({text})=>{
    console.log("ai modeule imported fine")

    
    const [isLoadingResume, setIsLoading]=useState(false)
const { completion, isLoading, complete, error } = useCompletion({
  api: '/api/resume',
});

    const [resumeText, setResumeText] = useState("")

    useEffect(()=>{
    const getResumeWorth = async(text) =>{
        const messageToSend =`RESUME:${text}\n\n-----------\n\n`
        await complete(messageToSend)
      
        setIsLoadingResume(true)

    
    }
//You need .then() or await if you want to run code after the async function completes.

    if(text!==""){
        getResumeWorth(text).then()
    }
    }, [text])


   

    return(
    <div>
        {((isLoadingResume|| isLoading) ?
        <div className={styles.loadingContainer}>
            </div>:}
      
          <p>{text}</p>
          
      
    </div>
    )
}
export default ResumeAnalyser
//send teh extracted text to api for analysis
//show the screen while waiting for results
//send the results to resumeworth component for display

