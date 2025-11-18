import { useEffect, useState } from "react"
import ResumeUploader from "./ResumeUploader"
import { useCompletion } from "@ai-sdk/react";
import ResumeWorth from "./ResumeWorth";
import styles from "../styles/ResumeAnalyser.module.css"

const ResumeAnalyser=({text})=>{

    console.log("Received text prop in ResumeAnalyser:", text);

    
    const [isLoadingResume, setIsLoadingResume]=useState(false)
const { completion, isLoading, complete } = useCompletion({
  api: '/api/resume',
});

    const [resumeText, setResumeText] = useState("")

    useEffect(()=>{
    const getResumeWorth = async(resumeText) =>{
        const messageToSend =`RESUME:${text}\n\n-----------\n\n`
        setIsLoadingResume(true)

        await complete(messageToSend)
      
        setIsLoadingResume(false)

    
    }
//You need .then() or await if you want to run code after the async function completes.

    if(text && Text.TRIM(!==""){
        getResumeWorth(text).then()
    }
    }, [text])


   

    return(
    <div>
        {((isLoadingResume|| isLoading) )?
        <div className={styles.loadingContainer}>
            </div>:(
                <ResumeWorth result={completion} />
            )}
      
          {/* <p>{text}</p> */}
          
      
    </div>
    )
}
export default ResumeAnalyser
//send teh extracted text to api for analysis
//show the screen while waiting for results
//send the results to resumeworth component for display

