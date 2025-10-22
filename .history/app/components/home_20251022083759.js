import React, { useState } from "react";
const Home=()=>{

     const [file, setFile] = useState(null);
     const handleSubmit=(e)=>{
        //give to pdf.js
        console.log("Resume uploaded:", file);
        if(!file){
            alert("Please select a file to upload.");
            return;
        }
        console.log("resume uploaded");
     }

    return(
        <div>
           <h1>Upload your resume and find your hire value!</h1> 
           
           <div className="upload-container">
           <input type='file' 
                className="file-upload"
                accept=".pdf"
                onChange={(e)=>setFile(e.target.files[0])}/>

                
           <button className="upload-button" onClick={handleSubmit}>Upload Resume</button>


            {file &&(
                <div file-displAy>
                    <h3>Selected file:{file.name}</h3>
                    <p>{Math.round(file.size/1024)} KB</p>
                </div>
            )}
           </div>
                
        </div>
    )
}
export default Home;