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
            onChange={(e) => setFile(e.target.files[0])} 

            />
            <button onSubmit={handleSubmit}></button>
            
                </button>
        </div>
      
    </div>
  )
}
