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
        reader.onload= async ()


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
he reason FileReader reads file contents asynchronously is to prevent blocking the browser’s main thread, which keeps the user interface responsive.

When you upload and read a file (like a PDF), it can be large and take some time to load. If the file was read synchronously (blocking), the entire webpage would freeze until all bytes are read, leading to a poor user experience — no clicks, no animations, no input processing.

Instead, FileReader reads the file in the background without freezing the UI and triggers events (like onload) when the file reading finishes. This asynchronous behavior allows users to continue interacting with the page smoothly during the file read operation.

In summary:

PDF files can be big and take time to load

Asynchronous reading prevents UI freezing

The browser processes file reading in background threads

Your code listens for completion (onload) and handles the data once ready

Using asynchronous APIs like FileReader is an essential web development practice for working with files smoothly in browsers.