'use client'
import React, { useState, useEffect } from 'react';
import ResumeAnalyser from './ResumeAnalyser';

const ResumeUploader = ({ resume }) => {
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);   // <-- NEW

  useEffect(() => {
    if (!resume) {
      setError("No resume file provided.");
      return;
    }

    if (resume.type !== "application/pdf") {
      setError("Invalid file type. Please upload a PDF file.");
      return;
    }

    setError(null);
    readResume(resume);

  }, [resume]);


  const mergeTextContent = (textContent) => {
    return textContent.items
      .map((item) => item.str + (item.hasEOL ? "\n" : ""))
      .join("");
  };

  const readResume = async (resumeFile) => {
    try {
      setIsExtracting(true);   // <-- START extraction message

      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result;

        if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
          const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
          const pdfDoc = await loadingTask.promise;

          let fullText = "";

          for (let i = 1; i <= pdfDoc.numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            fullText += mergeTextContent(textContent) + "\n\n";
          }

          setExtractedText(fullText);
        }

        setIsExtracting(false); // <-- END extraction message
      };

      reader.readAsArrayBuffer(resumeFile);

    } catch (err) {
      setError("Error processing PDF file. Try again.");
      setIsExtracting(false);
    }
  };

  return (
    <div>
      {error && <p className="text-red-400">{error}</p>}

      {isExtracting && (
  <div className="flex flex-col items-center mt-6 gap-3">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-400"></div>

    <p className="text-indigo-300 text-center text-lg">
      Extracting text from your PDF…
    </p>

    <p className="text-sm text-indigo-400 opacity-70 text-center">
      This may take a few seconds depending on your file size.
    </p>

    {/* Progress Illusion */}
    <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
      <div className="h-full w-full bg-indigo-400 animate-progress"></div>
    </div>
  </div>
)}

      )}

      {!isExtracting && extractedText.trim().length > 50 ? (
        <ResumeAnalyser text={extractedText} />
      ) : (
        !isExtracting && <p className="text-gray-400 text-center">Preparing your resume…</p>
      )}
    </div>
  );
};

export default ResumeUploader;
