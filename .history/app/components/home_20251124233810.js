'use client'
import React, { useState } from "react";
import ResumeUploader from '../components/ResumeUploader';

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = () => {
    setUploaded(true);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center px-4 py-12">

      {/* APP NAME */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-indigo-400 drop-shadow-md">
          Value<span className="text-white">+</span>Ed
        </h1>
        <p className="text-gray-400 mt-3 text-sm md:text-base">
          Discover the real market value behind your skills.
        </p>
      </div>

      {/* UPLOAD BOX */}
      <div className="w-full max-w-lg bg-gray-900 p-6 rounded-2xl shadow-xl border border-gray-800/50">
        <h2 className="text-xl font-semibold text-center mb-5 text-gray-100">
          Upload your resume and find your hire value!
        </h2>

        <div className="flex flex-col items-center gap-5">

          <input
            type="file"
            accept=".pdf"
            className="
              w-full text-sm text-gray-300 
              file:mr-4 file:py-2 file:px-4 
              file:rounded-xl file:border-0
              file:text-sm file:font-semibold 
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700 
              cursor-pointer
            "
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={handleSubmit}
            className="
              w-full bg-indigo-600 hover:bg-indigo-700 
              py-3 rounded-xl text-lg font-semibold
              shadow-md transition-all duration-200
            "
          >
            Upload Resume
          </button>
        </div>
      </div>

      {/* FILE DISPLAY */}
      {file && (
        <div className="mt-6 bg-gray-900 w-full max-w-lg p-4 rounded-xl shadow-md border border-gray-800/50">
          <p className="text-gray-300 text-center">
            Selected file: 
            <span className="text-white font-semibold ml-1">{file.name}</span>
            <span className="ml-2 text-indigo-400">
              {Math.round(file.size / 1024)} KB
            </span>
          </p>
        </div>
      )}

      {/* OUTPUT COMPONENT */}
      {uploaded && (
        <div className="w-full max-w-3xl mt-12">
          <ResumeUploader resume={file} />
        </div>
      )}

    </div>
  );
};

export default Home;
