'"use client";
import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <FileText className="w-12 h-12 text-indigo-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Upload Your Resume
        </h2>
        <p className="text-gray-500 mb-6">
          Drop your resume here or click to upload.
        </p>

        <label
          htmlFor="resume"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-indigo-400 rounded-xl cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition"
        >
          <Upload className="w-8 h-8 text-indigo-600 mb-2" />
          <span className="text-sm text-indigo-700 font-medium">
            {file ? file.name : "Click or drag file to upload"}
          </span>
          <input
            type="file"
            id="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
