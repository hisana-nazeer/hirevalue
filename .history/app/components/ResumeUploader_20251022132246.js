import React from 'react';
import { useState } from 'react';
import * as 
  
const ResumeUploader=(props)=>{

    const {resume}=props
    const [error, setError]= useState(null);
    
    
    if(!resume){
        setError("No resume file provided.");
        return
    }
    else if(resume.type!=="application/pdf"){
        setError("Invalid file type. Please upload a PDF file.");
        return
    }
    else{

    }

    console.log("file received in ResumeUploader:", resume.name);

    return(
        <div>
            <h2>Resume Uploader Component</h2>
            
        </div>

    
    )
}
export default ResumeUploader;

/**Install and import pdfjs-dist dynamically

Install PDF.js: npm install pdfjs-dist

Import it dynamically inside your file reading function to reduce initial bundle size.

Write a readResume function

Use FileReader to read the uploaded PDF file as an ArrayBuffer.

Use PDF.js’s getDocument() and getPage() methods to extract text (start with the first page only).

Store or log the extracted text for now. */