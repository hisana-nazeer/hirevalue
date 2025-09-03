'use client'
// File: AwesomeUploadPage.jsx
import React, { useState, useRef } from "react";
import { UploadCloud, FileText, Loader2, Sparkles } from "lucide-react";

/**
 * AwesomeUploadPage
 * - Tailwind required
 * - lucide-react for icons (npm i lucide-react)
 *
 * Usage: import and render <AwesomeUploadPage />
 */
export default function AwesomeUploadPage() {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef(null);

  const handlePick = (f) => {
    setFile(f);
  };

  const onFileChange = (e) => {
    const f = e.target.files?.[0];
    if (f) handlePick(f);
  };

  // Drag handlers
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handlePick(f);
  };

  const startUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(6);

    // simulated upload (replace with real upload)
    const id = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.floor(Math.random() * 12) + 6);
        if (next >= 100) {
          clearInterval(id);
          setTimeout(() => {
            setUploading(false);
            setProgress(100);
            // After success you would route to analysis page / call API
            alert("Resume uploaded & queued for AI analysis ✨");
          }, 300);
        }
        return next;
      });
    }, 450);
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  // friendly filesize
  const humanSize = (n) => {
    if (!n) return "";
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${Math.round(n / 1024)} KB`;
    return `${(n / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 flex items-center justify-center p-6">
      {/* floating decorative shapes */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <svg className="absolute top-8 left-8 w-72 h-72 opacity-30 animate-slow-rotate" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0" stopColor="#7c3aed" />
              <stop offset="1" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="60" fill="url(#g1)" />
        </svg>
        <svg className="absolute bottom-8 right-6 w-64 h-64 opacity-28 animate-pulse-slow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g2" x1="0" x2="1">
              <stop offset="0" stopColor="#7c3aed" />
              <stop offset="1" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="180" height="180" rx="36" fill="url(#g2)" />
        </svg>
      </div>

      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Hero */}
          <div className="space-y-6 px-6 md:px-0">
            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-white/30">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 p-3 shadow-xl transform -rotate-12">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">Discover your true career worth</h2>
                  <p className="text-sm text-slate-600 mt-1">AI-powered resume score • Salary estimate • Actionable rewrites</p>
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-700">
                <p>
                  Upload your resume and get an instant, data-driven evaluation that recruiters trust. Learn where you stand and what to fix — in minutes.
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-indigo-500" /> ATS safe</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500" /> Quantified impact</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-amber-400" /> Salary band</li>
                  <li className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-pink-500" /> One-click rewrites</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <small className="text-xs text-slate-500">Trusted by</small>
              <div className="mt-2 flex items-center gap-4">
                <div className="h-10 w-24 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">Acme</div>
                <div className="h-10 w-24 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">FinCo</div>
                <div className="h-10 w-24 rounded-xl bg-gradient-to-r from-slate-200 to-slate-100 flex items-center justify-center text-xs font-semibold text-slate-700">Hirely</div>
              </div>
            </div>
          </div>

          {/* Right: Upload Card */}
          <div className="relative">
            <div className={`rounded-3xl p-6 md:p-8 shadow-2xl bg-white/60 backdrop-blur-md border border-white/30`}>
              {/* Floating small icons */}
              <div className="absolute -top-6 -left-6 bg-white/30 p-2 rounded-full shadow-sm">
                <UploadCloud className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/30 p-2 rounded-full shadow-sm">
                <Sparkles className="w-6 h-6 text-pink-500" />
              </div>

              <div
                onDragOver={onDragOver}
                onDragEnter={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`relative rounded-2xl border-2 transition-all duration-300 ease-in-out ${
                  dragOver ? "border-indigo-400 bg-indigo-50/60" : "border-dashed border-slate-200 bg-white/40"
                } p-6 cursor-pointer`}
                onClick={() => fileRef.current?.click()}
                role="button"
                tabIndex={0}
                aria-label="Upload resume"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={onFileChange}
                />

                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 border border-white/50 shadow-sm">
                    <FileText className="w-8 h-8 text-indigo-600" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-800">Drag & drop your resume</h3>
                        <p className="text-xs text-slate-500 mt-0.5">PDF or DOCX • We redact PII before analysis</p>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-slate-500">1 free analysis</div>
                        <div className="text-xs text-amber-500 font-medium">Pro features available</div>
                      </div>
                    </div>

                    {/* Preview or hint */}
                    {!file && (
                      <div className="mt-4 text-sm text-slate-600">Click here or drop a file to start. You can also paste the resume text later.</div>
                    )}

                    {file && (
                      <div className="mt-4 flex items-center gap-3 bg-white/70 border border-slate-100 rounded-lg p-3">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-emerald-500" />
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-slate-800 truncate" title={file.name}>{file.name}</div>
                            <div className="text-xs text-slate-500">{humanSize(file.size)} • {file.type || "unknown"}</div>
                          </div>
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="text-xs px-3 py-1 rounded-md bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress bar */}
                {uploading && (
                  <div className="mt-5">
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all" />
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Uploading…</span>
                      <span>{progress}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action area */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => fileRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 rounded-xl bg-white/70 border border-slate-200 shadow-sm hover:scale-[1.01] transition"
                >
                  <UploadCloud className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-slate-800">Choose File</span>
                </button>

                <button
                  onClick={startUpload}
                  disabled={!file || uploading}
                  className={`flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2 rounded-xl text-white font-semibold transition ${
                    file ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.02]" : "bg-slate-300 cursor-not-allowed"
                  }`}
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Get My Resume Worth</span>}
                </button>
              </div>

              {/* micro-footer */}
              <div className="mt-4 text-xs text-slate-500">We securely process resumes — PII redaction & GDPR-friendly retention controls.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom small CSS for subtle animations (Tailwind config may not include these by default) */}
      <style>{`
        /* slower rotate for background circle */
        .animate-slow-rotate { animation: slowrotate 18s linear infinite; transform-origin: center; }
        @keyframes slowrotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* slow pulse */
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
        @keyframes pulseSlow { 0% { opacity: .25; transform: scale(1);} 50% { opacity: .45; transform: scale(1.02);} 100% { opacity: .25; transform: scale(1);} }
      `}</style>
    </div>
  );
}
