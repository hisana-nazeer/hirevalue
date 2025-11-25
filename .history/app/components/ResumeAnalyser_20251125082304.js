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
    <div className="mt-6">
      {isLoading ? (
      
  <div className="mt-6 animate-pulse space-y-4">

    <div className="h-6 bg-gray-700 rounded w-1/3 mx-auto"></div>

    <div className="h-4 bg-gray-700 rounded w-2/3 mx-auto"></div>

    <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto"></div>

    <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>

    <div className="flex justify-center mt-6">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-400"></div>
    </div>

    <p className="text-indigo-300 text-center mt-2">
      Analyzing your resume…
    </p>
  </div>
) : (
  <ResumeWorth result={result} />
)}

      ) : (
        <ResumeWorth result={result} />
      )
    </div>
  );
};

export default ResumeAnalyser;
