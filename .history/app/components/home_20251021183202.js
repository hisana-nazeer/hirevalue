import React, { useState } from "react";
const Home=()=>{

     const [uploadedResume, setUploadedResume] = useState(null);

    return(
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
           <input type='file' 
                className="file-upload"/>
                value={uploadedResume}
                onChange={(e)=>{e.target.}

                
           <button className="upload-button">Upload Resume</button>

           </div>
                
        </div>
    )
}
export default Home;