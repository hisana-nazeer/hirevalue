import React, { useState } from "react";
const Home=()=>{

     const [uploadedResume, setUploadedResume] = useState(null);
     const handleSubmit=(e)

    return(
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
           <input type='file' 
                className="file-upload"/>
                value={uploadedResume}
                onChange={(e)=>{setUploadedResume(e.target.value)}}

                
           <button className="upload-button" onClick={handleSubmit}>Upload Resume</button>

           </div>
                
        </div>
    )
}
export default Home;