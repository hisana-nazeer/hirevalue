
import React, { useState } from "react";
import { Upload, FileText, Loader2 } from "lucide-react";

export default function UploadPage() {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl p-10 space-y-8 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>

        <div className="relative text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Upload Your Resume
          </h1>
          <p className="text-gray-500 text-sm">
            Get instant AI-powered insights on your career worth
          </p>
        </div>

        <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-10 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition group">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resumeUpload"
          />
          <label htmlFor="resumeUpload" className="flex flex-col items-center cursor-pointer">
            <Upload className="w-12 h-12 text-indigo-500 group-hover:scale-110 transition-transform" />
            <span className="mt-3 text-gray-600 font-medium">Click to select file</span>
            <span className="text-xs text-gray-400 mt-1">PDF or DOCX only</span>
          </label>
          {file && (
            <div className="mt-5 flex items-center space-x-3 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">
              <FileText className="w-5 h-5 text-green-500" />
              <span className="truncate max-w-[200px]">{file.name}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="relative w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
}