'use client'
import React, { useState } from 'react'

export default function resumeUpload() {

    const [file, setFile] = useState(null);






  return (
    <div>
        <div classname= "upload box">
            <h1>Upload your resume</h1>
            <input 
            type="file"
            onChange={()} 
            />
            <button>Submit</button>
        </div>
      
    </div>
  )
}
