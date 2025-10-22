import React, { useState } from "react";
import ResumeUploader from '../components/ResumeUploader'

const Home = () => {

     const [file, setFile] = useState(null);
     const [isLoading, setIsLoading] = useState(false);

     const handleSubmit = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        // give to pdf.js or uploader logic
        console.log("Resume uploaded:", file);
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }
        console.log("resume uploaded");
        <ResumeUploader resume={file} />
     };

    return (
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
             <input
                type='file' 
                className="file-upload"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
             />

             <button className="upload-button" onClick={handleSubmit}>Upload Resume</button>

           </div>
            {file && (
                <div className="file-display">
                    <p>Selected file: {file.name} <span className="span">{Math.round(file.size/1024)} KB</span></p>
                    <ResumeUploader resume={file} />
                </div>
            )}
        </div>
    )

}
export default Home;