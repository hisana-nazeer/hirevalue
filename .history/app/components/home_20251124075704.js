'use client'
import React, { useState } from "react";
import ResumeUploader from '../components/ResumeUploader'

const Home = () => {
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(false);

  const handleSubmit = () => {
    console.log("resume uploaded");
    setUploaded(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 ">
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-8">
        Upload your resume and find your hire value!
      </h1>

      <div className="upload-container w-full max-w-md bg-white shadow-sm rounded-xl p-6 flex flex-col gap-4">
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-upload block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition p-2"
        />

        <button
          onClick={handleSubmit}
          className="upload-button w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Upload Resume
        </button>
      </div>

      {file && (
        <div className="file-display mt-6 bg-white shadow-sm rounded-lg p-4 w-full max-w-md text-center">
          <p className="text-gray-700">
            Selected file: <span className="font-semibold">{file.name}</span>{" "}
            <span className="text-sm text-gray-500">
              ({Math.round(file.size / 1024)} KB)
            </span>
          </p>
        </div>
      )}

      {uploaded && (
        <div className="mt-8 w-full max-w-3xl">
          <ResumeUploader resume={file} />
        </div>
      )}
    </div>
  );
};

export default Home;
