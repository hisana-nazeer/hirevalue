// import { useEffect, useState } from "react"
// import ResumeUploader from "./ResumeUploader"
// import { useCompletion } from "@ai/react"

// const ResumeAnalyser=({text})=>{

//     const { completion, isLoading, complete, error } = useCompletion
//     const [resumeText, setResumeText] = useState("")

//     const getResumeWorth = async(text) =>{
//         const messageToSend =`RESUME:${text}\n\n-----------\n\n`
//         await complete(messageToSend)
    
//     }

//     if(text!==""){}



   

//     return(
//     <div>
      
//           <p>{text}</p>
          
      
//     </div>
//     )
// }
// export default ResumeAnalyser
// //send teh extracted text to api for analysis
// //show the screen while waiting for results
// //send the results to resumeworth component for display


import React, { useState, useEffect } from "react";

const ResumeAnalyser = ({ text }) => {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setAnalysis(data.result);
      console.log(data);
    } catch (err) {
      setAnalysis("Error analyzing resume.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (text) analyzeResume();
  }, [text]);

  return (
    <div>
      <h3>Resume Analysis</h3>
      {loading ? <p>Analyzing your resume...</p> : <pre>{analysis}</pre>}
    </div>
  );
};

export default ResumeAnalyser;
