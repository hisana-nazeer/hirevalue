import React from 'react';
import { useState } from 'react';
import * as pdfjsLib from "pdfjs-dist"
  
const ResumeUploader=(props)=>{

    const {resume}=props
    const [error, setError]= useState(null);
    
    
    useEffect(()=>{
    if(!resume){
        setError("No resume file provided.");
        return
    }
    if(resume.type!=="application/pdf"){
        setError("Invalid file type. Please upload a PDF file.");
        return
    }
    setError(null);
       readResume(resume)
    
    },[resume]);

    console.log("file received in ResumeUploader:", resume.name);

    const readResume = async(resumeFile)=>{
       //Import it dynamically inside your file reading function to reduce initial bundle size.
        
        const pdfjs = await import("pdfjs-dist")
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

        //Use FileReader to read the uploaded PDF file as an ArrayBuffer.

        const reader= new FileReader();
        reader.onload= async (event)=>{
            const arrayBuffer= event.target?.result;
            if (arrayBuffer && arrayBuffer instanceof ArrayBuffer){
                const loadingTTask = pdfjs.getDocument(new U)
            }
        }


    }

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



Use PDF.js’s getDocument() and getPage() methods to extract text (start with the first page only).

Store or log the extracted text for now. */
/** */