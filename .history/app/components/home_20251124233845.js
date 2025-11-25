'use client'
import React, { useState } from "react";
import ResumeUploader from '../components/ResumeUploader';

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = (e) => {
    console.log("resume uploaded");
    setUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center px-4 py-10">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 tracking-wide">
        Upload your resume and find your hire value!
      </h1>

      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center gap-5">

          <input
            type="file"
            accept=".pdf"
            className="w-full text-sm text-gray-300 
                       file:mr-4 file:py-2 file:px-4 
                       file:rounded-xl file:border-0
                       file:text-sm file:font-semibold 
                       file:bg-indigo-600 file:text-white
                       hover:file:bg-indigo-700 
                       cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-700 
                       py-3 rounded-xl text-lg font-semibold
                       shadow-md transition-all duration-200"
          >
            Upload Resume
          </button>
        </div>
      </div>

      {file && (
        <div className="mt-6 bg-gray-800 w-full max-w-lg p-4 rounded-xl shadow-md">
          <p className="text-gray-300 text-center">
            Selected file: 
            <span className="text-white font-semibold ml-1">{file.name}</span>
            <span className="ml-2 text-indigo-400">
              {Math.round(file.size / 1024)} KB
            </span>
          </p>
        </div>
      )}

      {uploaded && (
        <div className="w-full max-w-3xl mt-10">
          <ResumeUploader resume={file} />
        </div>
      )}

    </div>
  );
};

export default Home;
