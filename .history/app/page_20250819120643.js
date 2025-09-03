'use client'
import { Upload, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ResumeWorthUpload() {
  const [loading, setLoading] = useState(false);

  const handleUpload = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex flex-col items-center gap-3 mb-6">
          <FileText className="w-12 h-12 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Upload Your Resume</h1>
          <p className="text-gray-600 text-sm">
            We don’t collect or store your resume. It’s only analyzed securely to
            estimate your career worth and potential salary insights.
          </p>
        </div>

        <form onSubmit={handleUpload} className="space-y-4">
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-indigo-500 transition">
            <Upload className="w-8 h-8 text-gray-500 mb-2" />
            <span className="text-gray-700">Click or drag & drop to upload</span>
            <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-indigo-700 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
              </>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </form>

        <p className="text-xs text-gray-400 mt-6">
          ⚡ Fast, secure, and private – your document is never saved.
        </p>
      </div>
    </div>
  );
}
