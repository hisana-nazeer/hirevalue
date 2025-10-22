import React, { useState, useEffect } from "react";

const ResumeUploader = ({ resume }) => {
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!resume) {
      setError("No resume file provided.");
      setExtractedText("");
      return;
    }
    if (resume.type !== "application/pdf") {
      setError("Invalid file type. Please upload a PDF file.");
      setExtractedText("");
      return;
    }
    setError(null);
    setExtractedText("");
    readResume(resume);
  }, [resume]);

  const mergeTextContent = (textContent) => {
    return textContent.items
      .map((item) => item.str + (item.hasEOL ? "\n" : ""))
      .join("");
  };

  const readResume = async (resumeFile) => {
    setIsLoading(true);
    try {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const reader = new FileReader();

      reader.onload = async (event) => {
        const arrayBuffer = event.target?.result;
        console.log("ArrayBuffer loaded, byte length:", arrayBuffer?.byteLength);

        if (arrayBuffer && arrayBuffer instanceof ArrayBuffer) {
          try {
            const loadingTask = pdfjs.getDocument(new Uint8Array(arrayBuffer));
            const pdfDoc = await loadingTask.promise;
            console.log("PDF document loaded, number of pages:", pdfDoc.numPages);

            let fullText = "";
            for (let i = 1; i <= pdfDoc.numPages; i++) {
              const page = await pdfDoc.getPage(i);
              const textContent = await page.getTextContent();
              fullText += mergeTextContent(textContent) + "\n\n";
              console.log(`Extracted text from page ${i}:`, fullText.substring(0, 100)); // first 100 chars
            }

            setExtractedText(fullText);
            setError(null);
          } catch (pdfError) {
            console.error("PDF.js document loading error:", pdfError);
            setError("Failed to load PDF document.");
          }
        } else {
          console.error("No valid ArrayBuffer found.");
          setError("Could not read the file data.");
        }
        setIsLoading(false);
      };

      reader.onerror = (err) => {
        console.error("FileReader error:", err);
        setError("Failed to read the file.");
        setIsLoading(false);
      };

      reader.readAsArrayBuffer(resumeFile);
    } catch (error) {
      console.error("Error in readResume:", error);
      setError("Unexpected error occurred while reading the resume.");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Resume Uploader Component</h2>
      {isLoading && <p>Loading and extracting text from PDF...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {extractedText && (
        <div>
          <h3>Extracted Resume Text:</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              maxHeight: "300px",
              overflowY: "auto",
              backgroundColor: "#f0f0f0",
              padding: "10px",
            }}
          >
            {extractedText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
