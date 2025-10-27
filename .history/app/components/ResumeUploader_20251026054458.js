import React from 'react';
import { useState, useEffect } from 'react';
import ResumeAnalyser from './ResumeAnalyser';

  
const ResumeUploader=(props)=>{

    const {resume}=props
    const [error, setError]= useState(null);
    const [extractedText, setExtractedText]= useState("");
    
    
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

    console.log("file received in ResumeUploader:");
    const mergeTextContent = (textContent) =>{
        return textContent.items.map((item)=> item.str+(item.hasEOL?"\n":"")).join("")
    }

    const readResume = async(resumeFile)=>{
       //Import it dynamically inside your file reading function to reduce initial bundle size.
      try{  
        const pdfjs = await import("pdfjs-dist")
        pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        //Use FileReader to read the uploaded PDF file as an ArrayBuffer.

        const reader= new FileReader();
        reader.onload= async (event)=>{
            const arrayBuffer= event.target?.result;
             console.log("ArrayBuffer loaded, byte length:", arrayBuffer?.byteLength);
            if (arrayBuffer && arrayBuffer instanceof ArrayBuffer){
                // Wrap the raw binary data in a Uint8Array for pdfjs to process
                const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer))
                const pdfDoc = await loadingTask.promise;
                
                console.log("PDF document loaded, number of pages:", pdfDoc.numPages);
                //initialize empty string to hold extracted text
                let fullText=" " 
                //loop through each page in resume doc
                for (let i=1; i<=pdfDoc.numPages; i++){
                    //
                    const page = await pdfDoc.getPage(i);
                    // Extract all the text content from this page
                    const textContent=await page.getTextContent()
                    // Convert the structured text content into a plain string and append it
                    fullText+= mergeTextContent(textContent)+"\n\n";

                }
                setExtractedText(fullText)
                console.log("Extracted text:", fullText);
                
                setError(null);
            }
            else{
                setError("Failed to read the file data.");
            }
        }
        reader.readAsArrayBuffer(resumeFile);
    } catch (err){
        setError("Error processing PDF file: "+ err.message+"please try again.");


    }

    return(
        <div>
            <h2>Resume Uploader Component</h2>
            {extractedText?(
                <ResumeAnalyser text={extractedText}/>
            ):(
            <p>Extracting text from your pdf...</p>
        )}
        <p>{extractedText</p>
        </div>

    
    )
}
}
export default ResumeUploader;

/**Install and import pdfjs-dist dynamically

Install PDF.js: npm install pdfjs-dist

Import it dynamically inside your file reading function to reduce initial bundle size.

Write a readResume function



Use PDF.js’s getDocument() and getPage() methods to extract text (start with the first page only).

Store or log the extracted text for now. */
