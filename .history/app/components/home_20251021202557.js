import React, { useState } from "react";
const Home=()=>{

     const [file, setFile] = useState(null);
     const handleSubmit=(e)=>{
        //give to pdf.js
        console.log("Resume uploaded:", file);
     }

    return(
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
           <input type='file' 
                className="file-upload"
                value={File}
                onChange={(e)=>setFile(e.target.files)}/>

                
           <button className="upload-button" onClick={handleSubmit}>Upload Resume</button>

           </div>
                
        </div>
    )
}
export default Home;