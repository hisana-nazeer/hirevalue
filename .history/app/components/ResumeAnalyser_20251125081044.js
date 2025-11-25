'use client'
import { useEffect, useState } from "react";
import ResumeWorth from "./ResumeWorth";

const ResumeAnalyser = ({ text }) => {
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchWorth() {
      if (!text || text.trim().length < 20) return;

      setIsLoading(true);

      const response = await fetch("/api/resume", {
        method: "POST",
        body: text
      });

      const data = await response.text();
      setResult(data);
      setIsLoading(false);
    }

    fetchWorth();
  }, [text]);

  return (
    <div>
      {isLoading ? (
        <div className="bg-gray-800 text-gray-300 p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto mt-6 text-center border border-gray-700 animate-pulse">
          <p className="text-lg font-semibold mb-2">
            I am scanning your resume...
          </p>
          <p className="text-sm text-gray-400">
            Just a moment, we’re analysing your skills and experience.
          </p>
        </div>
      ) : (
        <ResumeWorth result={result} />
      )}
    </div>
  );
};

export default ResumeAnalyser;
