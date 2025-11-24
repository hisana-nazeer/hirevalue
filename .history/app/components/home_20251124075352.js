'use client'
import React, { useState } from "react";
import ResumeUploader from '../components/ResumeUploader'

const Home = () => {

     const [file, setFile] = useState(null);
    //  const [isLoading, setIsLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
     const handleSubmit = (e) => {
      
        console.log("resume uploaded");
       setUploaded(true);
     };

    return (
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
             <input 
                type='file' 
                className="file-upload p-4 border-amber-300 "
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
             />
 
             <button className="upload-button" onClick={handleSubmit}>Upload Resume</button>

           </div>
            {file && (
                <div className="file-display">
                    <p>Selected file: {file.name} <span className="span">{Math.round(file.size/1024)} KB</span></p>
                    
                </div>
            )}
            {uploaded && <ResumeUploader resume={file}/>}
        </div>
    )

}
export default Home;