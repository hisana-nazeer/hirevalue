import React, { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    setLoading(true);
    // Mock upload request
    setTimeout(() => {
      setLoading(false);
      alert("Resume uploaded successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Upload Your Resume</h1>
          <p className="text-gray-500 mt-2">Supported formats: PDF, DOCX</p>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resumeUpload"
          />
          <label htmlFor="resumeUpload" className="flex flex-col items-center cursor-pointer">
            <Upload className="w-10 h-10 text-indigo-500" />
            <span className="mt-2 text-gray-600">Click to select file</span>
          </label>
          {file && (
            <div className="mt-4 flex items-center space-x-2 text-sm text-gray-700">
              <FileText className="w-5 h-5 text-green-500" />
              <span>{file.name}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        "Upload Resume"
                      )}
              </button>
            </div>
          </div>
  )}